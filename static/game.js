function Game() {
    this.gameFinished = false;
    this.budget = 600;

    this.duration = 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.coffeeQueue = [];
    this.baristas = [];
    this.cupCoffeePrice = 10;
    this.baristaPay = 700;
    this.coffeePrice = 50;
    this.coffeeSold = 0;

    this.coffeeContent = 7;
    this.coffeeMachinePrice = 500;
    this.remaincoffeeContent = 0;
    this.slowMoTime = 0;
    this.satisfaction = 1;

    document.getElementById('buy-coffee-machine').innerHTML = "Buy Coffee Machine(" + this.coffeeMachinePrice + "₺)";
    document.getElementById('buy-coffee').innerHTML = "Buy Coffee (" + this.coffeePrice + "₺)";
    document.getElementById('hire-barista').innerHTML = "Hire a Barista (" + this.baristaPay + "₺)";


    this.updateTime = function () {
        if (this.coffeeQueue.length > 0) {
            this.slowMoTime++;
            if (this.slowMoTime < 20) return;
            else this.slowMoTime = 0;
        }
        this.duration++;
        if (this.duration > 59) {
            this.duration = 0;
            this.hour++;
        }
        if (this.hour > 23) {
            this.hour = 0;
            this.day++;
        }
        var dateText = "Day - " + this.day + ", Time - " + this.hour + ":" + this.duration;
        document.getElementById('time').innerHTML = dateText;
        this.coffeeQueue.forEach(coffee => {
            coffee.update();
        });
    }


    this.buyCoffee = function () {
        if (this.budget >= this.coffeePrice) {
            this.remaincoffeeContent += 250;
            this.budget -= this.coffeePrice;
            this.updateBudget();
            this.updateRemainCoffee();
        }
    }


    this.buyCoffeeMachine = function () {
        if (this.budget >= this.coffeeMachinePrice) {
            this.budget -= this.coffeeMachinePrice;
            this.updateBudget();
        }
    }

    this.orderCoffee = function () {
        this.coffeeQueue.push(new Coffee(this.cupCoffeePrice));
        document.getElementById('coffee-queue').innerHTML = "Coffee Waiting : " + this.coffeeQueue;
        this.updateCoffeeQueue();
    }

    this.prepareCoffee = function () {
        if (this.remaincoffeeContent > this.coffeeContent) {
            this.budget += this.coffeeQueue[0].price;
            this.updateBudget();
            this.coffeeQueue.shift();
            this.updateCoffeeQueue();
            this.remaincoffeeContent -= this.coffeeContent;
            this.updateRemainCoffee();
            var tmp = Math.random() * 50;
            this.satisfaction = Math.round((this.satisfaction * 1000 + tmp)) / 1000;
            this.updateSatisfaction();
            this.coffeeSold++;
            this.updateCoffeeSold();
        }
    }

    this.updateBudget = function () {
        document.getElementById('budget').innerHTML = "Budget : " + this.budget + "₺";
        if (this.budget < this.coffeeMachinePrice) {
            document.getElementById('buy-coffee-machine').disabled = true;
        } else {
            document.getElementById('buy-coffee-machine').disabled = false;

        }
        if (this.budget < this.coffeePrice) {
            document.getElementById('buy-coffee').disabled = true;
        } else {
            document.getElementById('buy-coffee').disabled = false;
        }
    }
    this.updateCoffeeQueue = function () {
        document.getElementById('coffee-queue').innerHTML = "Coffee Waiting : " + this.coffeeQueue.length;
    }
    this.updateRemainCoffee = function () {
        if (this.remaincoffeeContent >= this.coffeeContent)
            document.getElementById('remain-coffee').innerHTML = "Remaining Coffee : " + this.remaincoffeeContent + "gr";
    }
    this.updateSatisfaction = function () {
        document.getElementById('satisfaction').innerHTML = "Customer Satisfaction : " + this.satisfaction + "/5";
    }
    this.updateCoffeeSold = function () {
        document.getElementById('coffee-sold').innerHTML = "Coffee Sold : " + this.coffeeSold;
    }

    this.updateBaristas = function () {
        document.getElementById('baristas').innerHTML = "Baristas : " + this.baristas.length;
    }

    this.update = function () {

        if (this.gameFinished) return;
        this.baristas.forEach(barista => {
            barista.update();            
        });
        this.updateTime();

        if (this.coffeeQueue.length > 0) {
            document.getElementById('prepare-coffee').disabled = false;
            for (i = this.coffeeQueue.length - 1; i >= 0; i--)
                if (this.coffeeQueue[i].duration > 9) {
                    this.coffeeQueue.splice(i, 1);
                    this.updateCoffeeQueue();
                    var tmp = Math.random() * 50;
                    this.satisfaction = Math.round((this.satisfaction * 950 + tmp)) / 1000;
                    this.updateSatisfaction();
                }
        } else {
            document.getElementById('prepare-coffee').disabled = true;
        }
        this.decideOrder();

    }


    this.decideOrder = function () {
        if (this.hour >= 7) {
            if (Math.random() < (0.001 + this.satisfaction / 1000)) {
                this.orderCoffee();
            }
        }
    }

    this.getPayCheck = function (price) {
        this.budget -= price;
        this.updateBudget();
        if (this.budget < 0) {
            this.finishGame();
        }
    }

    this.hireBarista = function () {
        this.baristas.push(new Barista(this.baristaPay));
        this.updateBaristas();
    }

    this.finishGame = function () {
        document.getElementById('gameStatus').innerHTML = "Game finished reload page to restart";
        document.getElementById('buy-coffee-machine').disabled = true;
        document.getElementById('buy-coffee').disabled = true;
        document.getElementById('prepare-coffee').disabled = true;
        document.getElementById('hire-barista').disabled = true;
        this.gameFinished = true;

    }

}

