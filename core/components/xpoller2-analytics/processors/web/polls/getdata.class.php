<?php

class xAnalyticsWebPollsGetdataProcessor extends modObjectGetListProcessor
{
  public $objectType = "xpQuestion";
  public $classKey = "xpQuestion";
	public $defaultSortField = "id";
  public $defaultSortDirection = "DESC";

  public function initialize()
  {
    $this->setDefaultProperties([
      'limit' => 0
    ]);

    return parent::initialize();
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
