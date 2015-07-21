##Instructions:

* Write a script that converts a map into a query string

####Input:
```
queryMap = {
  address: "3400 stratford",
  full_name: {
    first_name: 'Timur',
    last_name: 'Meyster',
    initials: { a: 1, b: 2 }
  },
  email: 'timurtwin@aol.com'
  }
```

####Output:
```
'address=3400%2520stratford&full_name%5Bfirst_name%5D=Timur&full_name%5Blast_name%5D=Meyster&full_name%5Binitials%5D%5Ba%5D=1&full_name%5Binitials%5D%5Bb%5D=2&email=timurtwin%2540aol.com'
```
