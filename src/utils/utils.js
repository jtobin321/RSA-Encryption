import { key } from './letterMap'

function multInverse(a, m) {
    a = a % m
    for (let i=1; i < m; i++) {
        if ((a * i) % m == 1) {
            return i
        }
    }
    return null
}

function prime_factors(n) {
    let i = 2
    let factors = []
    while (i * i <= n) {
        if (n % i) {
            i +=1
        } else {
            n = Math.floor(n / i)
            factors.push(i)
        }
    }
    if (n > 1) {
        factors.push(n)
    }
    return factors
}

export function encrypt(N, e, plainText, key) {
    let cipher = ""
    for (let i=0; i < plainText.length; i++) {
        if (plainText.charAt(i) == " ") {
            cipher += " "
        } else {
            let num = Number(key[plainText.charAt(i)])
            let numEncrypted = (num ** e) % N
            for (var index in key) {
                if (Number(key[index]) == numEncrypted) {
                    cipher += index
                }
            }
        } 
    }
    return cipher
}

export function decrypt(N, e, cipherText, key) {
    let factors = prime_factors(N)
    let p = factors[0]
    let q = factors[1]

    let alt_mod = (p - 1) * (q - 1)
    let e_inv = multInverse(e, alt_mod)

    let plainText = ""
    for (let i=0; i < cipherText.length; i++) {
        if (cipherText.charAt(i) == " ") {
            plainText += " "
        } else {
            let num = Number(key[cipherText.charAt(i)])
            let numDecrypted = (num ** e_inv) % N
            for (var index in key) {
                if (Number(key[index]) == numDecrypted) {
                    plainText += index
                }
            }
        }
    }
    return plainText
}