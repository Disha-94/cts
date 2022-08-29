const { exec } = require('child_process');


const io = require('socket.io')(4000, {
    cors: {
        origin: ['https://localhost:3000/'],
    },
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('runcode', (obj, cb) => {
        {
            console.log(obj)
            // var execution = 'Rscript ycode.r ' + obj.pid + " " + "'" + obj.planting + "'" + " " + obj.fertpl + " " + "'" + obj.simls + "'" + " " + obj.price + " " + obj.Nprice
            var execution = "Rscript run_Rcode"
            console.log(execution)
            modelPath = "../"
            exec(execution, { maxBuffer: 1024 * 10000, cwd: modelPath }, function (err, stdout, status) {
                console.log("Status code: " + status)
                if (err) {
                    if (status.includes('Warning messages:')) {
                        console.log(`stdout: ${stdout}`);
                        cb(`Result success`)
                    } else {
                        console.error(`exec error: ${err}`);
                        cb(`Result failed`)
                    }
                    return;
                } else {
                    console.log(`stdout: ${stdout}`);
                    cb(`Result success`)
                }
            });
            // testing code for 10 mintues
            /** setTimeout(() => {
                console.log("running for 10 min")
                cb(`Result success`)
            }, 3000); **/

        }
    })
})