import { DataSetCategories } from 'src/app/Models/dataset-categories';

const dataSetCategories: DataSetCategories[] = [
    {
      id: 1,
      category: 'databases (19)',
      categoryType: [
        {
          categoryName: 'bigquery',
          categoryType: 'databases',
          logo: 'assets/logos/bigquery/icon.svg',
        },
        {
          categoryName: 'clickhouse',
          categoryType: 'databases',
          logo: 'assets/logos/clickhouse/icon.svg',
        },
        {
          categoryName: 'cosmosdb',
          categoryType: 'databases',
          logo: 'assets/logos/cosmosdb/icon.svg',
        },
        {
          categoryName: 'couchdb',
          categoryType: 'databases',
          logo: 'assets/logos/couchdb/icon.svg',
        },
        {
          categoryName: 'dynamodb',
          categoryType: 'databases',
          logo: 'assets/logos/dynamodb/icon.svg',
        },
        {
          categoryName: 'elasticsearch',
          categoryType: 'databases',
          logo: 'assets/logos/elasticsearch/icon.svg',
        },
        {
          categoryName: 'firestore',
          categoryType: 'databases',
          logo: 'assets/logos/firestore/icon.svg',
        },
        {
          categoryName: 'influx',
          categoryType: 'databases',
          logo: 'assets/logos/influxdb/icon.svg',
        },
        {
          categoryName: 'mariadb',
          categoryType: 'databases',
          logo: 'assets/logos/mariadb/icon.svg',
        },
        {
          categoryName: 'mongodb',
          categoryType: 'databases',
          logo: 'assets/logos/mongodb/icon.svg',
          size: "25px"
        },
        {
          categoryName: 'mssql',
          categoryType: 'databases',
          logo: 'assets/logos/mssql/icon.svg',
        },
        {
          categoryName: 'mysql',
          categoryType: 'databases',
          logo: 'assets/logos/mysql/icon.svg',
        },
        {
          categoryName: 'oracledb',
          categoryType: 'databases',
          logo: 'assets/logos/oracledb/icon.svg',
        },
        {
          displayName: "PostgreSQL",
          categoryName: 'postgre',
          categoryType: 'databases',
          logo: 'assets/logos/postgresql/icon.svg',
        },
        {
          categoryName: 'redis',
          categoryType: 'databases',
          logo: 'assets/logos/redis/icon.svg',
        },
        {
          categoryName: 'rethinkdb',
          categoryType: 'databases',
          logo: 'assets/logos/rethinkdb/icon.svg',
        },
        {
          categoryName: 'saphana',
          categoryType: 'databases',
          logo: 'assets/logos/saphana/icon.svg',
        },
        {
          categoryName: 'snowflake',
          categoryType: 'databases',
          logo: 'assets/logos/snowflake/icon.svg',
        },
        {
          displayName: "Type Sense",
          categoryName: 'typesensedb',
          categoryType: 'databases',
          logo: 'assets/logos/typesense/icon.svg',
        },
      ],
    },
  
    {
      id: 2,
      category: 'productivity apps (20)',
      categoryType: [
        {
          categoryName: 'airtable',
          categoryType: 'productivityapps',
          logo: 'assets/logos/airtable/icon.svg',
        },
        {
          categoryName: 'amazonses',
          categoryType: 'productivityapps',
          logo: 'assets/logos/amazonses/icon.svg',
        },
        {
          categoryName: 'appwrite',
          categoryType: 'productivityapps',
          logo: 'assets/logos/appwrite/icon.svg',
        },
        {
          categoryName: 'athena',
          categoryType: 'productivityapps',
          logo: 'assets/logos/athena/icon.svg',
        },
        {
          categoryName: 'baserow',
          categoryType: 'productivityapps',
          logo: 'assets/logos/baserow/icon.svg',
        },
        {
          categoryName: 'mailgun',
          categoryType: 'productivityapps',
          logo: 'assets/logos/mailgun/icon.svg',
        },
        {
          categoryName: 'n8n',
          categoryType: 'productivityapps',
          logo: 'assets/logos/n8n/icon.svg',
        },
        {
          categoryName: 'notion',
          categoryType: 'productivityapps',
          logo: 'assets/logos/notion/icon.svg',
        },
        {
          categoryName: 'openapi',
          categoryType: 'productivityapps',
          logo: 'assets/logos/openapi/icon.svg',
        },
        {
          categoryName: 'restapi',
          categoryType: 'productivityapps',
          logo: 'assets/logos/restapi/icon.svg',
        },
        {
          categoryName: 'sendgrid',
          categoryType: 'productivityapps',
          logo: 'assets/logos/sendgrid/icon.svg',
        },
        {
          categoryName: 'smtp',
          categoryType: 'productivityapps',
          logo: 'assets/logos/smtp/icon.svg',
        },
        {
          categoryName: 'stripe',
          categoryType: 'productivityapps',
          logo: 'assets/logos/stripe/icon.svg',
        },
        {
          categoryName: 'twilio',
          categoryType: 'productivityapps',
          logo: 'assets/logos/twilio/icon.svg',
        },
        {
          categoryName: 'woocommerce',
          categoryType: 'productivityapps',
          logo: 'assets/logos/woocommerce/icon.svg',
        },
        {
          categoryName: 'zendesk',
          categoryType: 'productivityapps',
          logo: 'assets/logos/zendesk/icon.svg',
        },
        {
          categoryName: 'googlesheets',
          categoryType: 'productivityapps',
          logo: 'assets/logos/googlesheets/icon.svg',
        },
        {
          categoryName: 'slack',
          categoryType: 'productivityapps',
          logo: 'assets/logos/slack/icon.svg',
        },
        {
          categoryName: 'graphql',
          categoryType: 'productivityapps',
          logo: 'assets/logos/graphql/icon.svg',
        },
        {
          categoryName: 'grpc',
          categoryType: 'productivityapps',
          logo: 'assets/logos/grpc/icon.svg',
        },
      ]
    },
    {
      id: 3,
      category: 'cloud storage (4)',
      categoryType: [
        {
          displayName: "Azure Blob Storage",
          categoryName: 'azureblobstorage',
          categoryType: 'cloudstorage',
          logo: 'assets/logos/azureblobstorage/icon.svg',
        },
        {
          categoryName: 'gcs',
          categoryType: 'cloudstorage',
          logo: 'assets/logos/gcs/icon.svg',
        },
        {
          categoryName: 'minio',
          categoryType: 'cloudstorage',
          logo: 'assets/logos/minio/icon.svg',
        },
        {
          categoryName: 's3',
          categoryType: 'cloudstorage',
          logo: 'assets/logos/s3/icon.svg',
        },
      ]
    },
    {
      id: 4,
      category: 'plugins (5)',
      categoryType: [
        {
          categoryName: 'openai',
          categoryType: 'plugins',
          logo: 'assets/logos/openai/icon.svg',
        },
        {
          categoryName: 'plivo',
          categoryType: 'plugins',
          logo: 'assets/logos/plivo/icon.svg',
        },
        {
          categoryName: 'github',
          categoryType: 'plugins',
          logo: 'assets/logos/github/icon.svg',
        },
        {
          categoryName: 'textract',
          categoryType: 'plugins',
          logo: 'assets/logos/textract/icon.svg',
        },
        {
          categoryName: 'harperdb',
          categoryType: 'plugins',
          logo: 'assets/logos/harperdb/icon.svg',
        },
      ]
    },
    {
      id: 5,
      category: 'ERP (8)',
      categoryType: [
        {
          categoryName: 'SAP',
          categoryType: 'erp',
          logo: 'assets/logos/SAP.png',
          size: "90px"
        },
        {
          categoryName: 'Oracle',
          categoryType: 'erp',
          logo: 'assets/logos/Oracle.png',
          size: "90px"
        },
        {
          categoryName: 'Epicor',
          categoryType: 'erp',
          logo: 'assets/logos/Epicor.png',
          size: "90px"
        },
        {
          categoryName: 'QAD',
          categoryType: 'erp',
          logo: 'assets/logos/qad/icon.svg',
          size: "90px"
        },
        {
          categoryName: 'NetSuite',
          categoryType: 'erp',
          logo: 'assets/logos/netsuite.png',
          size: "90px"
        },
        {
          categoryName: 'QuickBook',
          categoryType: 'erp',
          logo: 'assets/logos/quickbook.svg',
          size: "50px"
        },
        {
          categoryName: 'ODOO',
          categoryType: 'erp',
          logo: 'assets/logos/odoo.svg',
          size: "90px"
        },
        {
          categoryName: 'Sage',
          categoryType: 'erp',
          logo: 'assets/logos/sage.png',
          size: "50px"
        }
      ]
    },
    {
      id: 6,
      category: 'QMS (7)',
      categoryType: [
        {
          categoryName: 'Safety Chain',
          categoryType: 'QMS',
          logo: 'assets/logos/safetychain/icon.jpg',
          size: "70px"
        },
        {
          categoryName: 'Trace Gains',
          categoryType: 'QMS',
          logo: 'assets/logos/tracegains/icon.svg',
          size: "50px"
        },
        {
          categoryName: 'Food LogiQ',
          categoryType: 'QMS',
          logo: 'assets/logos/foodlogiq/icon.png',
          size: "70px"
        },
        {
          categoryName: 'Master Control',
          categoryType: 'QMS',
          logo: 'assets/logos/mastercontrol/icon.svg',
          size: "90px"
        },
        {
          categoryName: 'dot compliance',
          categoryType: 'QMS',
          logo: 'assets/logos/dotcompliance/icon.jpg',
          size: "70px"
        },
        {
          categoryName: '1 factory',
          categoryType: 'QMS',
          logo: 'assets/logos/1factory/icon.png',
          size: "90px"
        },
        {
          categoryName: 'compliance quest',
          categoryType: 'QMS',
          logo: 'assets/logos/compliancequest/icon.jpg',
          size: "50px"
        }
      ]
    },
    {
      id: 7,
      category: 'MES (3)',
      categoryType: [
        {
          categoryName: 'MBRAIN',
          categoryType: 'mes',
          logo: 'assets/logos/MBrain.svg',
          size: "90px"
        },
        {
          categoryName: 'plex',
          categoryType: 'mes',
          logo: 'assets/logos/plex/icon.svg',
          size: "90px"
        },
        {
          categoryName: 'tulip',
          categoryType: 'mes',
          logo: 'assets/logos/tulip/icon.svg',
          size: "50px"
        },
      ]
    },
    {
      id: 8,
      category: 'HRMS (5)',
      categoryType: [
        {
          categoryName: 'ADP',
          categoryType: 'hrms',
          logo: 'assets/logos/adp.png',
          size: "90px"
        },
        {
          categoryName: 'Kronos',
          categoryType: 'hrms',
          logo: 'assets/logos/kronos.png',
          size: "90px"
        },
        {
          categoryName: 'Workday',
          categoryType: 'hrms',
          logo: 'assets/logos/workday.png',
          size: "90px"
        },
        {
          categoryName: 'SAP successfactors',
          categoryType: 'hrms',
          logo: 'assets/logos/SAP.png',
          size: "80px"
        },
        {
          categoryName: 'TalentHub',
          categoryType: 'hrms',
          logo: 'assets/logos/talenthub.png',
          size: "50px"
        },
      ]
    },
    {
      id: 9,
      category: 'CRM (2)',
      categoryType: [
        {
          categoryName: 'Salesforce',
          categoryType: 'crm',
          logo: 'assets/logos/Salesforce.png',
          size: "70px"
        },
        {
          categoryName: 'Hubspot',
          categoryType: 'crm',
          logo: 'assets/logos/Hubspot.png',
          size: "90px"
        },
      ]
    },
    {
      id: 10,
      category: 'Shipping (6)',
      categoryType: [
        {
          categoryName: 'USPS',
          categoryType: 'shipping',
          logo: 'assets/logos/usps.svg',
          size: "90px"
        },
        {
          categoryName: 'Fedex',
          categoryType: 'shipping',
          logo: 'assets/logos/fedex.svg',
          size: "90px"
        },
        {
          categoryName: 'Amazon',
          categoryType: 'shipping',
          logo: 'assets/logos/amazon.svg',
          size: "90px"
        },
        {
          categoryName: 'UPS',
          categoryType: 'shipping',
          logo: 'assets/logos/ups.svg',
          size: "90px"
        },
        {
          categoryName: 'DHL',
          categoryType: 'shipping',
          logo: 'assets/logos/dhl.png',
          size: "90px"
        },
        {
          categoryName: 'ShipStation',
          categoryType: 'shipping',
          logo: 'assets/logos/shipstation.png',
          size: "90px"
        }
      ]
    },
    {
      id: 11,
      category: 'Files (3)',
      categoryType: [
        {
          categoryName: 'Word',
          categoryType: 'files',
          logo: 'assets/logos/word.svg',
          size: "90px"
        },
        {
          categoryName: 'Pdf',
          categoryType: 'files',
          logo: 'assets/logos/pdf.png',
          size: "50px"
        },
        {
          categoryName: 'Excel',
          categoryType: 'files',
          logo: 'assets/logos/excel.png',
          size: "50px"
        }
      ]
    }
  ].slice().sort((a, b) => a.category.localeCompare(b.category));
  

  export default dataSetCategories;