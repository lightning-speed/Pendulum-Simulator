const ServerOrigin = "";
const ServerAddress = ServerOrigin + "/api";

class Client {
  static async register(email, username, password, handler, err) {
    const url = ServerAddress;

    const data = {
      type: "reg",
      username: username,
      email: email,
      passwordHash: sha256(password),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",

      body: JSON.stringify(data),
    };
    try {
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("authCred", JSON.stringify(data));
          console.log(data);
          if (handler != null) {
            handler(data);
          }
        })
        .catch((error) => {
          if (err != null) {
            err(error);
          } else {
            console.error(error);
          }
        });
    } catch (error) {
      if (err != null) err(error);
      else {
        console.error(error);
      }
    }
  }
  static async login(email, username, password, handler, err) {
    const url = ServerAddress;

    const data = {
      type: "auth",
      username: username,
      email: email,
      passwordHash: sha256(password),
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("authCred", JSON.stringify(data));
        console.log(data);

        if (handler != null) {
          handler(data);
          App.init();
        }
      })
      .catch((error) => {
        if (err != null) err(error);
        else {
          console.error(error);
        }
      });
  }
  static authBasedRequest(data) {
    let authCred = localStorage.getItem("authCred");
    if (authCred != null) {
      authCred = JSON.parse(authCred);
    } else return data;
    const credHeader = [authCred.id, authCred.username, authCred.sessionID];
    data.credHeader = credHeader;
    return data;
  }
  static async request(method, data, handler, err, et) {
    const url = ServerAddress;

    data = this.authBasedRequest(data);
    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      mode: "cors",

      body: JSON.stringify(data),
    };
    const out = CacheHouse.request(requestOptions);
    if (out != null) {
      if (handler != null) {
        handler(out);
      }
      return;
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (handler != null) {
          CacheHouse.saveRequest(requestOptions, data, et);
          handler(data);
        }
      })
      .catch((error) => {
        if (err != null) err(error);
        else {
          console.log(error.message);
        }
      });
  }
  static async logout() {
    localStorage.removeItem("authCred");
  }
  static async request(method,type,data) {
    return new Promise((resolve, reject) => {
      this.request(
        method,
        {...{ type: type},...data},
        (dat) => {
          resolve(dat);
        },
        (err) => {
          reject(err);
        },
        0
      );
    });
  }

}

var sha256 = function sha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = "length";
  var i, j; // Used as a counter across the whole file
  var result = "";

  var words = [];
  var asciiBitLength = ascii[lengthProperty] * 8;

  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = (sha256.h = sha256.h || []);
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = (sha256.k = sha256.k || []);
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += "\x80"; // Append Ƈ' bit (plus zero padding)
  while ((ascii[lengthProperty] % 64) - 56) ascii += "\x00"; // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return; // ASCII check: only accept characters in range 0-255
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  // process each chunk
  for (j = 0; j < words[lengthProperty]; ) {
    var w = words.slice(j, (j += 16)); // The message is expanded into 64 words as part of the iteration
    var oldHash = hash;
    // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      var i2 = i + j;
      // Expand the message into 64 words
      // Used below if
      var w15 = w[i - 15],
        w2 = w[i - 2];

      // Iterate
      var a = hash[0],
        e = hash[4];
      var temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + // S1
        ((e & hash[5]) ^ (~e & hash[6])) + // ch
        k[i] +
        // Expand the message schedule if needed
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + // s0
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | // s1
              0);
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      var temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + // S0
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

      hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : "") + b.toString(16);
    }
  }
  return result;
};

function fetchJSON(url) {
  //TODO FJ;
  if (url.includes("entryStatements.json"))
    return [
      "Cats Are So Cute!!!",
      "Once upon a time we used to touch grass",
      "Fact: The only thing doctors are scared of are APPLES!",
      "This App was made in 13 days",
      "Every day has its night so magical",
      "Go help your mom ",
      "A Dream never ends",
      "Lol GPT 4 still cannot solve leet code problems",
      "\"I'm not procrastinating, I'm just prioritizing my doing-nothing time.\" - The Orange Cat",
      "Life feels so lonely without cat memes",
      "plug in plug out, do it when you wanna be lound",
      "When life gives you lemons, use them wisely",
      "Kids are annoying tbh",
      "Idk why but potatoes suck at being tomatos",
      "Report a bug at krishtandon9838@gmail.com and get a bug hunter badge",
      "'Labore et Nostalgia'",
    ];
  if (url.includes("Meta.json"))
    return {
      version: "1.0.0",
      name: "Hypester",
      versionNumber: 1,
    };
}
