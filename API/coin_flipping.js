function tossCoin(){
    return Math.random() > 0.5? "heads" : "tails";
}

function fiveHeadsSync() {
    let headsCount = 0;
    let attempts = 0;
    while(headsCount < 5){
        attempts++;
        let result = tossCoin();
        console.log(result +" was flipped");
        if(result == "heads"){
            headsCount++;
        } else{
            headsCount = 0;
        }
    }
    return 'it took ' +attempts+' tries to flip five "heads"';
}

//console.log(fiveHeadsSync());
//console.log("THis is run after the fiveHeadsSync function completes");

function fiveHeads() {
    return new Promise((resolve, reject) =>{
        let headsCount = 0;
        let attempts = 0;
        while(headsCount < 5){
            attempts++;
            let result = tossCoin();
            console.log(result +" was flipped");
            if(result == "heads"){
                headsCount++;
            } else{
                headsCount = 0;
            }
        }
        if (headsCount == 5){
            resolve("five heads in a row")
        }
    });
}

fiveHeads()
    .then(res => console.log(res))
    .catch((err => console.log(err)));
console.log("when does this run");