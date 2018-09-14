import {JSEncrypt} from 'jsencrypt'

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDqU5zwt4nCYOiC7n/GLgjfcyK/y1utX+9LoKOqcOiQB22I6MOA
CqtkM5NA6F4n/LbfLBT6xtauouM9PGJU65yqmVgbVVsTUGjrbm7PZI7Zusn05fPP
p57sFAJRt2fxGL0LHjfW80nvn4DByqds0wI/x1RSm+Rms1GEa/0zEEBZJQIDAQAB
AoGALqY8rTNsynSudTpz14lcnNd4CIS8mJRruDufuZPGyL2h0cq8+OWm30jhPN/F
tuI5qc5F0vL41EV7RbqavNs3EeHtKkbGVTkJK2gEy2bvPL8IxoF/4ZfL4tRfSosr
MVLZ++6AObO59oGRdvNUNfFx4a7j8rxQ6IZBa/RBQY+jePUCQQD7ojXF4gReKfza
io15tDGQRriCsvr3cK7UKxhbMqjJW4BwTKdrEZKeqDhR3UbsDZmDXIbEzQt7kB1G
tqBRQNrHAkEA7mSF3kKl+/1tWQEDn/dokWCS7qLHZCh1UnqIzE9okRZCP1RfMYAT
KF0lzKDrEH9euv+X4KxnQxkCGhZd/H2gswJAOW+iFIPteUzeMUf02PW/Zm4uCW8v
B7HJxhX8Hjzm9+cR3xAwGqlNLTe6ez0lxhWol6pT/LHM0Cxp8k0XNNS32wJALVHo
7S8IdRZhsljyAng7Zd/RLxK9Czpxy2NGHGlAPMzZfUah7jwl6DeFFxjEd1dvf+dV
TT4ZR3U6pBD6fyS25wJBAIiv7DqPW9RnRcQVr2/SiwZGuTOlsHhJQaCpkNr836eM
VazxsLITxHst2s4+uwaCanAfEXvCTllTi77YSjAGgAQ=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDqU5zwt4nCYOiC7n/GLgjfcyK/
y1utX+9LoKOqcOiQB22I6MOACqtkM5NA6F4n/LbfLBT6xtauouM9PGJU65yqmVgb
VVsTUGjrbm7PZI7Zusn05fPPp57sFAJRt2fxGL0LHjfW80nvn4DByqds0wI/x1RS
m+Rms1GEa/0zEEBZJQIDAQAB
-----END PUBLIC KEY-----`;

const RSA_MAX_LENGTH = 2;
export function encrept(string){
    let encrept = new JSEncrypt();
    encrept.setPublicKey(publicKey);
    const length = string.length;
    let splitted = 0;
    let encrepted = '';
    while (splitted < length){
        console.log(splitted)
        let subbuf 
        if(splitted + RSA_MAX_LENGTH < length){
            subbuf = string.slice(splitted, splitted + RSA_MAX_LENGTH);
        } else {
            subbuf = string.slice(splitted, length);
            console.log(subbuf);
        }
        const enStr = encrept.encrypt(subbuf);
        console.log(enStr);
        encrepted += window.atob(enStr);
        console.log(encrepted);
        splitted += RSA_MAX_LENGTH;
    }
    encrepted = window.btoa(encrepted);
    console.log(encrepted)
    return encrept.encrypt(string)
}
export function decrept(string){
    let decrept = new JSEncrypt();
    decrept.setPrivateKey(privateKey);
    return decrept.decrypt(string)
}