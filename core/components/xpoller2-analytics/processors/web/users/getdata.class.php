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

    if ($query = $this->getProperty('query')) {
        $c->where([
          'username:LIKE' => "{$query}%"
        ]);
    }

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

    $polls = [];

    if ($collection = $this->modx->getCollection('xpAnswer', [
      "uid" => $array['id']
    ])) {
      $id = 0;
      foreach ($collection as $answer) {
        $polls[] = [
          'id'  => $id++,
          'question'  => $answer->getOne('Question')->toArray(),
          'option'  => $answer->getOne('Option')->toArray()
        ];
      }
    }

    $array['polls'] = $polls;

    return $array;
  }
}
return 'xAnalyticsWebUsersGetdataProcessor';
