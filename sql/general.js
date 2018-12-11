var html_dir = './views/';

module.exports = function(app){
app.get('/general/:id',function (req,res,next){
	console.log('general GET ' + req.params.id);
	res.sendfile( html_dir + 'general.html');
});

};
