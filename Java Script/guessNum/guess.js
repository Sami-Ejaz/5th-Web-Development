let num = Math.random() * 5;
num = Math.floor(num) + 1;
console.log(num);
function guess(m) {
    let n = m;
    const result = document.getElementById("a");
    console.log(result);
    switch (true) {
        case (num == n):
            result.innerText = "You guessed it right! 🎉";
            break;
        case (num > n):
            result.innerText = "Too low! Try again. ⬆️";
            break;
        case (num < n):

            result.innerText = "Too high! Try again. ⬇️";
            break;
        default:
            result.innerText = "Error! Something went wrong. ❌";
            break;
    }
}