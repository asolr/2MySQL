/*

  jSYNC - MySQL to MySQL or CSV to MySQL
   Version 0.1 (prerelease)
   Date: 11/2012

   Maps nodes from a CSV file or MySQL database or from two SQL databases

*/

function SQL_NODE(path) {
  if(path){
    var index = path.lastIndexOf("."); // BUG make sure no "odd.table"."name"
    this.name = index >= 0 ? path.slice(index+1) : path; // the name of the SQL column or title of the field 
    this.table = index >= 0 ? path.substring(0, index) : ""; // the table that the element is located in
    this.path = path; // the full path + name
    this.value = null; 
  }
  return this;
}

// from = "db1.table.field" to = "db2.table.field";
function SQL_LINK(from, to) {
  this.from = from;
  this.to = to;
  return this;
}

function SQL_MAP() {
}

SQL_MAP.prototype.add = function (link) {
  if(this[link.from.table] || this[link.from.table] == "") { // push the node
    this[link.from.table].push(link);
  } 
  else {
    this[link.from.table] = [link];
  }
}

function SQL_QUERY(BSON) {
  // the BSON object should look like this... you do not need to specify this unless you want to use the SQL.query method
  this.query = {type: "", table : "", fields : [], where : []};
  for (var element in BSON) {
    this.query[element] = BSON[element];
  }
}

SQL.prototype.sync = function (fromDB, maps, callback) {

  var map = new SQL_MAP();
  
  for(var index = 0; index < maps.length; index++){
    for(var link in maps[index]) {
      var from = new SQL_NODE(link);
      var to = new SQL_NODE(maps[link]);
      var link = new SQL_LINK(from, to);
      map.add(link); 
    }
  }
  
}
