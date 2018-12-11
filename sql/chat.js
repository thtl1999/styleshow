//chat service
var count=1;
module.exports = function(io){
io.on('connection', function(socket){ //3
  console.log('user connected: ', socket.id);  //3-1
  var name = "익명" + count++;                 //3-1
  //var name = socket.id;
  io.to(socket.id).emit('change name',name);   //3-1

  socket.on('disconnect', function(){ //3-2
    console.log('user disconnected: ', socket.id);
  });

  socket.on('send message', function(name,text,roomid){ //3-3
    var msg = name + ' : ' + text;
    console.log(msg + ' roomid:' + roomid);
    io.emit('receive message', msg, roomid);
  });
});
};
