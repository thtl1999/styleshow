var html_dir = './views/';
var ejs_dir = 'ejsTemplate/';
var total=0;

function searchTags(datas,mysqlDB,res)
{
for ( var i = 0; i <datas.length; i++)
	{
		datas[i].Tags="";
		var sql="SELECT CID, GROUP_CONCAT(tag) AS Tags FROM Tags WHERE CID="+datas[i].CID+" GROUP BY CID;"
		mysqlDB.query(sql,function (err, rows) 
	    {
			var tems=i;
	        if(err)
			{ console.log('[SELECT ERROR] - ',err.message);total=total-1;return;}

	       if(rows.length>0)
		   {
			   for(var p = 0; p <datas.length; p++)
			   {
				   if(datas[p].CID==rows[0].CID)
				   {
					   console.log('CIDDDDD:  '+String(rows[0].CID));
					   var temtag=rows[0].Tags;
				   	datas[p].Tags=temtag;
					   return;
				   }
			   }
		  }
		   total=total-1;
		   console.log('total:  '+String(total));
	   });
	}
	while (true)
{
	if(total<=0)
	{
		console.log('datalength222:  '+String(datas.length));
		console.log('tagsssss:  '+String(datas[0].Tags));
		res.json(datas);
		return;
	}
}
	
}



module.exports = function(app,mysqlDB){
	


	
app.get('/search',function (req,res,next){

	console.log('search GET ' );
	res.sendfile( html_dir + 'search.html');

});


app.get('/search/:data',function (req,res,next){
	
var	filePath=ejs_dir+'search.ejs';
var reqstr=req.params.data.split(",");;
var type=reqstr[0];
var val=reqstr[1];

console.log("type"+type );
console.log("val"+val );
	  
res.render(filePath,{
				  ifget:"true",
				  seatchtype:type,
				  seatchval:val});
				  
});


app.post('/search/request',function (req,res,next){
var datas=[];
var  sql="";
var type=req.body.type;
var val=req.body.val;
console.log('/search/request ' );
console.log("type: "+type );
console.log("val: "+val );
if(type=="title")
{
	console.log('search title ' );
	 //sql= "SELECT * FROM Contents where Title LIKE '%"+val+"%' limit 0,10";
	sql="SELECT *, GROUP_CONCAT(tag) AS Tags FROM (SELECT Tags .tag,Contents.* FROM Tags RIGHT JOIN Contents ON Tags.CID = Contents.CID)F WHERE Title LIKE '%"+val+"%' GROUP BY CID limit 0,10;"
}
else if(type=="cid")
{
	console.log('search cid ' );
	//sql= "SELECT * FROM Contents where CID LIKE '%"+val+"%' limit 0,10";
	sql="SELECT *, GROUP_CONCAT(tag) AS Tags FROM (SELECT Tags .tag,Contents.* FROM Tags INNER JOIN Contents ON Tags.CID = Contents.CID)F WHERE CID="+val+" GROUP BY CID limit 0,10;";
}
else if(type=="tag")
{
	console.log('search tag ' );
	//sql= "SELECT Contents.* FROM Tags inner join Contents on Tags.CID=Contents.CID where Tags.tag='"+val+"' limit 0,10; ";
	//sql="SELECT *, GROUP_CONCAT(tag) AS Tags FROM (SELECT Tags .tag,Contents.* FROM Tags LEFT JOIN Contents ON Tags.CID = Contents.CID)F WHERE Tag LIKE '%"+val+"%' GROUP BY CID limit 0,10;";
	sql="SELECT * FROM(SELECT *, GROUP_CONCAT(tag) AS Tags FROM (SELECT Tags .tag,Contents.* FROM Tags LEFT JOIN Contents ON Tags.CID = Contents.CID)F GROUP BY CID) F WHERE Tags LIKE '%"+val+"%';";
}
else
{
	sql= 'SELECT * FROM Contents limit 0,10';
}

	mysqlDB.query(sql,function (err, rows) 
	{
        if(err)
		{ console.log('[SELECT ERROR] - ',err.message);return;}

       for(var i=0; i < rows.length; i++) 
	   {
		   var tem = {
			  CID: rows[i].CID,
			  Title:rows[i].Title,
			  Insertdate:rows[i].Insertdate,
			  like:rows[i].LLike,
			  Views:rows[i].Views,
			 Type:rows[i].Type,
			   Tags:rows[i].Tags
		  }
		    datas.push(tem);
	   }
	 
	   res.json(datas);
	});

});
}
