function Game(){
    this.budget=600;
    this.duration=0;
    this.day=0;
    this.hour=0;
    this.minute=0;
    this.coffeeQueue=[];
    this.cupCoffeePrice=10;
    this.coffeePrice=50;
    this.coffeeSold=0;

    this.coffeeContent=7;
    this.coffeeMachinePrice=500;
    this.remaincoffeeContent=0;
    this.slowMoTime=0;
    this.satisfaction=1;

    document.getElementById('buy-coffee-machine').innerHTML= "Buy Coffee Machine("+ this.coffeeMachinePrice+")";
    document.getElementById('buy-coffee').innerHTML= "Buy Coffee ("+ this.coffeePrice+")";


    this.updateTime=function(){
        if (this.coffeeQueue.length>0){
            this.slowMoTime++;
            if (this.slowMoTime<50) return;
            else this.slowMoTime=0;
        }
        this.duration++;
        if (this.duration>59){
            this.duration=0;
            this.hour++;
        }
        if (this.hour>23){
            this.hour=0;
            this.day++;
        }
        var dateText= "Day - "+this.day + ", Time - " + this.hour +":"+this.duration; 
        document.getElementById('time').innerHTML = dateText;
        this.coffeeQueue.forEach(coffee => {
            coffee.update();
        });
    }


    this.buyCoffee=function(){
        this.remaincoffeeContent+=250;
        this.budget-=this.coffeePrice;
        this.updateBudget();
        this.updateRemainCoffee();
    }


    this.buyCoffeeMachine=function(){
        this.budget-=this.coffeeMachinePrice;
        this.updateBudget();
    }

    this.orderCoffee=function(){
        this.coffeeQueue.push(new Coffee(this.cupCoffeePrice));
        document.getElementById('coffee-queue').innerHTML = "Coffee Waiting : " + this.coffeeQueue;
        this.updateCoffeeQueue();
    }

    this.prepareCoffee=function(){
        this.budget+=this.coffeeQueue[0].price;
        this.updateBudget();
        this.coffeeQueue.shift();
        this.updateCoffeeQueue();
        this.remaincoffeeContent-=this.coffeeContent;
        this.updateRemainCoffee();
        var tmp=Math.random()*50;
        this.satisfaction=Math.round((this.satisfaction*1000+tmp))/1000;
        this.updateSatisfaction();
        this.coffeeSold++;
        this.updateCoffeeSold();
        
    }

    this.updateBudget=function(){
        document.getElementById('budget').innerHTML = "Budget : " + this.budget;
        if (this.budget<this.coffeeMachinePrice){
            document.getElementById('buy-coffee-machine').disabled=true;
        }else{
            document.getElementById('buy-coffee-machine').disabled=false;

        }
        if (this.budget<this.coffeePrice){
            document.getElementById('buy-coffee').disabled=true;
        }else{
            document.getElementById('buy-coffee').disabled=false;
        }
    }
    this.updateCoffeeQueue=function(){
        document.getElementById('coffee-queue').innerHTML = "Coffee Waiting : " + this.coffeeQueue.length;
    }
    this.updateRemainCoffee=function(){
        if(this.remaincoffeeContent>=this.coffeeContent)
        document.getElementById('remain-coffee').innerHTML = "Remaining Coffee : " + this.remaincoffeeContent + "gr";
    }
    this.updateSatisfaction=function(){
        document.getElementById('satisfaction').innerHTML = "Customer Satisfaction : " + this.satisfaction + "/5";
    }
    this.updateCoffeeSold=function(){
        document.getElementById('coffee-sold').innerHTML = "Coffee Sold : " + this.coffeeSold;
    }
    this.gameFinished= false;

    this.update=function(){
        this.updateTime();

        if (this.coffeeQueue.length>0){
            document.getElementById('prepare-coffee').disabled=false;
            for (i=this.coffeeQueue.length-1;i>=0;i--)
                if (this.coffeeQueue[i].duration>9){
                    this.coffeeQueue.splice(i,1);
                    this.updateCoffeeQueue();
                    var tmp=Math.random()*50;
                    this.satisfaction=Math.round((this.satisfaction*950+tmp))/1000;
                    this.updateSatisfaction();
                }
        }else{
            document.getElementById('prepare-coffee').disabled=true;
        }
        this.decideOrder();

    }
    

    this.decideOrder=function(){
        if (this.hour>=7 ){
        if (Math.random()<0.002+this.satisfaction/1000){
            this.orderCoffee();
        }
    }
    }

}

