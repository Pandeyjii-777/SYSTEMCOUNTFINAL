import SQLite from "react-native-sqlite-storage";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Reactoffline.db";
const database_version = "1.0";
const database_displayname = "SQLite React Offline Database";
const database_size = 200000;

export default class Database {

  //add a function for Database initialization that creates Database, tables, etc.
    initDB() {
        let db;
        return new Promise((resolve) => {
          console.log("Plugin integrity check ...");
          SQLite.echoTest()
            .then(() => {
              console.log("Integrity check passed ...");
              console.log("Opening database ...");
              SQLite.openDatabase(
                database_name,
                database_version,
                database_displayname,
                database_size
              )
                .then(DB => {
                  db = DB;
                  console.log("Database OPEN");
                  db.executeSql('SELECT 1 FROM Product LIMIT 1').then(() => {
                      console.log("Database is ready ... executing query ...");
                  }).catch((error) =>{
                      console.log("Received error: ", error);
                      console.log("Database not yet ready ... populating data");
                      db.transaction((tx) => {
                          tx.executeSql('CREATE TABLE IF NOT EXISTS Product ( prodId, prodName VARCHAR(20), prodDesc, prodImage, prodPrice)');
                      }).then(() => {
                          console.log("Table created successfully");
                      }).catch(error => {
                          console.log(error);
                      });
                  });
                  resolve(db);
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log("echoTest failed - plugin not functional");
            });
          });
      };


      //Add a function for the close Database connection.
      closeDatabase(db) {
        if (db) {
          console.log("Closing DB");
          db.close()
            .then(status => {
              console.log("Database CLOSED");
            })
            .catch(error => {
              this.errorCB(error);
            });
        } else {
          console.log("Database was not OPENED");
        }
      };

      //Add a function to save a new product to the SQLite database.
      addProduct(prod) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('INSERT INTO Product VALUES (?, ?, ?, ?, ?)', [prod.prodId, prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }



      //Add a function to get the list of products.
      listProduct() {
        return new Promise((resolve) => {
          const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT   p.prodId, p.prodName, p.prodImage, p.prodPrice, p.prodDesc FROM Product p' , []).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod ID: ${row.prodId},   Prod Name: ${row.prodName}`)
                  const { prodId, prodName, prodImage, prodPrice, prodDesc } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage,
                    prodPrice,
                    prodDesc
                  });
                }
                console.log(products);
                resolve(products);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }

      
      
      //Add a function to get the list of products By Left Organization.
      listProductL() {
        return new Promise((resolve) => {
          const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT p.prodId, p.prodName, p.prodImage, p.prodPrice, p.prodDesc FROM Product p WHERE  p.prodDesc= ?', ["Left"]).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
                  const { prodId, prodName, prodImage, prodPrice, prodDesc } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage,
                    prodPrice,
                    prodDesc
                  });
                }
                console.log(products);
                resolve(products);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }


      
      //Add a function to get the list of products By Right Organization.
      listProductR() {
        return new Promise((resolve) => {
          const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT p.prodId, p.prodName, p.prodImage, p.prodPrice, p.prodDesc FROM Product p WHERE  p.prodDesc= ?', ["Right"]).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
                  const { prodId, prodName, prodImage, prodPrice, prodDesc } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage,
                    prodPrice,
                    prodDesc
                  });
                }
                console.log(products);
                resolve(products);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }



      //Add a function to get the list of products By Active Status.
      listProductA() {
        return new Promise((resolve) => {
          const products = [];
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT p.prodId, p.prodName, p.prodImage, p.prodPrice, p.prodDesc FROM Product p WHERE  p.prodPrice= ?', ["Active"]).then(([tx,results]) => {
                console.log("Query completed");
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Prod ID: ${row.prodId},  Prod Name: ${row.prodName}`)
                  const { prodId, prodName, prodImage, prodPrice, prodDesc } = row;
                  products.push({
                    prodId,
                    prodName,
                    prodImage,
                    prodPrice,
                    prodDesc
                  });
                }
                console.log(products);
                resolve(products);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }


     //Add a function to get the list of products By Inactive Status.
     listProductI() {
      return new Promise((resolve) => {
        const products = [];
        this.initDB().then((db) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT p.prodId, p.prodName, p.prodImage, p.prodPrice, p.prodDesc FROM Product p WHERE  p.prodPrice= ?', ["Inactive"]).then(([tx,results]) => {
              console.log("Query completed");
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Prod ID: ${row.prodId}, Prod Name: ${row.prodName}`)
                const { prodId, prodName, prodImage, prodPrice, prodDesc } = row;
                products.push({
                  prodId,
                  prodName,
                  prodImage,
                  prodPrice,
                  prodDesc
                });
              }
              console.log(products);
              resolve(products);
            });
          }).then((result) => {
            this.closeDatabase(db);
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      });  
    }









      //Add a function to get Product by ID.
      productById(id) {
        console.log(id);
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              
              tx.executeSql('SELECT * FROM Product WHERE prodId = ?', [id]).then(([tx,results]) => {
                console.log(results);
                if(results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }




      //Add a function to update a product.
      updateProduct(id, prod) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('UPDATE Product SET prodName = ?, prodDesc = ?, prodImage = ?, prodPrice = ?  WHERE prodId = ?', [prod.prodName, prod.prodDesc, prod.prodImage, prod.prodPrice,  id]).then(([tx, results]) => {
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
      }


      //Add a function to delete a product.
      deleteProduct(id) {
        return new Promise((resolve) => {
          this.initDB().then((db) => {
            db.transaction((tx) => {
              tx.executeSql('DELETE FROM Product WHERE prodId = ?', [id]).then(([tx, results]) => {
                console.log(results);
                resolve(results);
              });
            }).then((result) => {
              this.closeDatabase(db);
            }).catch((err) => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        });  
        
      }

     


      
}