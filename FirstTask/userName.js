var userName = prompt('Write your user name', '');
var haveNumber = false;

for(var i = 0; i < userName.length; i++) {
   if (isNumeric(userName[i])) {
        alert(changeStringCase(userName));
        haveNumber = true;
        break;
   }
}

if (haveNumber === false) {
    alert(reverseString(userName));
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function reverseString(str) {
    var reverse_str = '';

    for (var i = str.length - 1; i >= 0; i--) {
        reverse_str += str[i];
    }

    return reverse_str;
}

function changeStringCase(str) {
    var result = str[0].toUpperCase();

    for (var i = 1; i < str.length; i++) {
        if (result[i-1].toUpperCase() == result[i-1]) {
            result += str[i].toLowerCase();
        }
        else result += str[i].toUpperCase();
    }

    return result;
}