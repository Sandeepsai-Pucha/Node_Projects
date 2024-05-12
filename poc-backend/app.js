var num = 10 
function display() {
    var num = 20 
    console.log(this.num)
}
console.log(this.num)
display()