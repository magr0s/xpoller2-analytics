<?php

class xAnalyticsWebPollsGetdataProcessor extends modObjectGetListProcessor
{
  public $classKey = "xpQuestion";
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
          'text:LIKE' => "%{$query}%"
        ]);
    }

    return $c;
  }

  public function prepareRow(xPDOObject $object)
  {
    $array = parent::prepareRow($object);

    if ($collection = $object->getMany("Options")) {
      $options = [];

      foreach ($collection as $row) {
        $options[] = $row->toArray();
      }
    }

    $array['options'] = $options;

    return $array;
  }
}

return "xAnalyticsWebPollsGetdataProcessor";
