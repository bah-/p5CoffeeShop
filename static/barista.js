function Barista(price){
    this.price=price;
    this.duration=0;
    //console.log(this.duration);


    this.update=function(){
        this.duration++;
        if (this.duration>600){
            this.duration=0;
            getPayCheck(this.price);
        }
    }
}