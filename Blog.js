Ext.require(['Ext.data.*', 'Ext.grid.*']);

Ext.define('UserDetails', {
    extend: 'Ext.data.Model',
     
      fields: [ 'id', 'name', 'username', 'email', {name:'street', mapping: 'address.street'}, 
               {name:'suite', mapping: 'address.suite'}, {name:'city', mapping: 'address.city'}, {name:'zipcode', mapping: 'address.zipcode'},
               {name:'lat', mapping: 'geo.lat'}, {name:'lng', mapping: 'geo.lng'}, 'phone', 'website',
               {name:'name', mapping: 'company.name'}, {name:'catchPhrase', mapping: 'company.catchPhrase'}, {name:'zipcode', mapping: 'company.bs'}
              ]    
  });
  Ext.define('PostDetails', {
      extend: 'Ext.data.Model',
      fields: ['userId', 'id', 'title', 'body']    
  });

  Ext.define('PostComments', {
      extend: 'Ext.data.Model',
      fields: [ 'postId', 'id', 'name', 'email', 'body']    
  });
Ext.onReady(function(){
  
 Ext.define('UserStore', {
    extend: 'Ext.data.Store',                     
                        autoLoad: true,
                        model: 'UserDetails',
                        proxy : {
                          type : 'rest',
                          url : 'https://jsonplaceholder.typicode.com/users',
                          reader: {
                                    type: 'json'
                          }
                        }                                
      });

   var postStore= Ext.create('Ext.data.Store',{                      
                        autoLoad: true,
                        model: 'PostDetails',
                        proxy : {
                          type : 'rest',
                          url : 'https://jsonplaceholder.typicode.com/posts',
                          reader: {
                                    type: 'json'
                          }
                        }                                
      });
var grid = Ext.create('Ext.grid.Panel', {
                renderTo: 'blogPost',
                width: 500,
                height: 330,
                frame: true,
                title: 'Posts',
                store: postStore,
                iconCls: 'icon-user',
                columns: [{
                    text: 'ID',
                    width: 50,
                    sortable: true,
                    dataIndex: 'id'
                },
                { text: 'Title',
            flex: 1,
            sortable: false,
            dataIndex: 'title',
            field: {
                xtype: 'textfield'
            }  
           },
          { text: 'User',
            dataIndex: 'userId',
              filter: {
                type: 'string'
            },
           renderer: function(value) {
              return Ext.StoreManager.lookup('UserStore').getById(value).get('name');
           }

           }
                    
     ]});


  });
