<?php

class xAnalyticsWebPollsGetdataProcessor extends modObjectGetListProcessor
{
  public $classKey = "xpTest";
	public $defaultSortField = "id";
  public $defaultSortDirection = "ASC";

  public function initialize()
  {
    $this->setDefaultProperties([
      'limit' => 30,
    ]);

    return parent::initialize();
  }

  public function prepareQueryBeforeCount(xPDOQuery $c)
  {
    $c = parent::prepareQueryBeforeCount($c);

    if ($query = $this->getProperty('query')) {
        $c->where([
          'name:LIKE' => "%{$query}%"
        ]);
    }

    return $c;
  }

  public function prepareRow(xPDOObject $object)
  {
    $array = parent::prepareRow($object);
    $questionsList = [];

    if ($questions = $this->modx->getCollection('xpQuestion', array(
      'tid' => $array['id'],
    ))) {
      foreach ($questions as $question) {
         $optionsList = [];

        if ($options = $question->getMany('Options')) {

          foreach ($options as $option) {
            $optionsList[] = $option->toArray();
          }
        }

        $questionsList[] = array_merge(
          $question->toArray(),
          array(
            'options' => $optionsList
          ));
      }
    }

    $array['questions'] = $questionsList;

    return $array;
  }
}

return "xAnalyticsWebPollsGetdataProcessor";
