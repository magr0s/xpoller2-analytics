<?php

require_once MODX_PROCESSORS_PATH . 'security/user/getlist.class.php';

class xAnalyticsWebUsersGetdataProcessor extends modUserGetListProcessor
{
  public $permission = '';

  public function initialize()
  {
    $this->setDefaultProperties([
      'limit' => 0,
      'query'   => 'test'
    ]);

    return parent::initialize();
  }

  public function prepareQueryBeforeCount(xPDOQuery $c)
  {
    $c = parent::prepareQueryBeforeCount($c);

    $ids = [];

    $q = $this->modx->newQuery('xpAnswer');
    $q->groupBy('uid');

    if ($answers = $this->modx->getCollection('xpAnswer', $q)) {
      foreach ($answers as $answer) {
        if (!in_array($answer->uid, $ids)) {
          $ids[] = $answer->uid;
        }
      }
    }

    $where['id:IN'] = $ids;

    if ($query = $this->getProperty('query')) {
        $where['username:LIKE'] = "{$query}%";
    }

    $c->where($where);

    return $c;
  }

  public function prepareRow(xPDOObject $object)
  {
    $array = parent::prepareRow($object);

    if ($profile = $object->getOne('Profile')) {
      $profileArray = $profile->toArray();

      unset($profileArray['id']);

      $array = array_merge($array, $profileArray);
    }

    $pollsList = [];

    if ($answers = $this->modx->getCollection('xpAnswer', array(
      'uid' => $array['id']
    ))) {
      foreach ($answers as $answer) {
        $question = $answer->getOne('Question')->toArray();
        $question['option'] = $answer->getOne('Option')->toArray();

        if ($poll = $this->modx->getObject('xpTest', array(
          'id'  => $question['tid']
        ))) {
          $id = $poll->id;

          $tmp = array_merge(
            (isset($pollsList[$id])) ? $pollsList[$id] : [],
            $poll->toArray()
          );

          if (!isset($tmp['question'])) {
            $tmp['question'] = [];
          }

          array_push($tmp['question'], $question);

          $pollsList[$id] = $tmp;
        }
      }
    }

    $array['polls'] = $pollsList;

    return $array;
  }
}
return 'xAnalyticsWebUsersGetdataProcessor';
