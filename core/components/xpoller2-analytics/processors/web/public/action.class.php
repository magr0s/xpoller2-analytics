<?php

class modSiteWebPublicActionProcessor extends modProcessor
{
  protected static $actualClassName;

  public static function getInstance(modX &$modx,$className,$properties = array())
  {
    if(!empty($properties['endpoint']) && !self::$actualClassName){
      switch($properties['endpoint']){
        case 'polls':
          require_once __DIR__ . '/../polls/getdata.class.php';
          self::$actualClassName = "xAnalyticsWebPollsGetdataProcessor";
          break;

        case 'users':
          require_once __DIR__ . '/../users/getdata.class.php';
          self::$actualClassName = "xAnalyticsWebUsersGetdataProcessor";
          break;

        default:;
      }
    }

    if(self::$actualClassName){
      $className = self::$actualClassName;
        return $className::getInstance($modx,$className,$properties);
      }

      return parent::getInstance($modx,$className,$properties);
    }


    public function process()
    {
      $error = 'Действие не существует или не может быть выполнено';
      $this->modx->log(xPDO::LOG_LEVEL_ERROR, __CLASS__ . " - {$error}");
      $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($this->getProperties(), true));
      return $this->failure($error);
    }

}
return 'modSiteWebPublicActionProcessor';
