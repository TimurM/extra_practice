##Instructions:

* Write a script that parses an url query string into a map

####Input:
```
'utf8=%E2%9C%93&authenticity_token=UA5dTNDXx8lw2ZVdk%2BRjk2z0fB%2BcRwAHEkZimLpAIcw%3D&reservation%5Bpurpose%5D=myles+byrne&reservation%5Bexpected_occupancy%5D%5Bactual_occ%5D=resp&reservation%5Bexpected_occupancy%5D%5Breal_occ%5D=resp&reservation%5Bhost_first_name%5D=&reservation%5Bhost_last_name%5D=&reservation%5Bhost_email%5D=&reservation%5Bemail_receipt%5D=0&reservation%5Bemail_receipt%5D=1&reservation%5Bon%5D=2015-07-16&reservation%5Bstarts_at_s%5D=6%3A45+PM&reservation%5Bfinishes_at_s%5D=8%3A45+PM&reservation%5Bquiet%5D=0&reservation%5Brepeats%5D=0&repeating%5Bfreq%5D=WEEKLY&repeating%5Binterval%5D=1&repeating%5Bduration_kind%5D=COUNT&repeating%5Bduration_count%5D=2&repeating%5Bduration_count_unit%5D=WEEK&repeating%5Buntil_at_s%5D=07%2F22%2F2015&commit=Create+Reservation'
```

####Output:
```
map = { utf8: '%E2%9C%93',
        authenticity_token: 'UA5dTNDXx8lw2ZVdk%2BRjk2z0fB%2BcRwAHEkZimLpAIcw%3D',
        reservation:
         { purpose: 'myles+byrne',
           expected_occupancy: { actual_occ: 'resp', real_occ: 'resp' },
           host_first_name: '',
           host_last_name: '',
           host_email: '',
           email_receipt: '0',
           on: '2015-07-16',
           starts_at_s: '6%3A45+PM',
           finishes_at_s: '8%3A45+PM',
           quiet: '0',
           repeats: '0' },
        repeating:
         { freq: 'WEEKLY',
           interval: '1',
           duration_kind: 'COUNT',
           duration_count: '2',
           duration_count_unit: 'WEEK',
           until_at_s: '07%2F22%2F2015' },
        commit: 'Create+Reservation'
        }

```
