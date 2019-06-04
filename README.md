# evrythng-cli-plugin-query
thng-query plugin for evrythng-cli

Allows to use thng-query alongside `evrythng-cli`:
```
evrythng query run "thngs named Consumer*"
evrythng query run "products tagged Apparel where properties.scan_count>5000"
evrytnhg query run "products where category=Consumables" | jq '.[] | { id }'
evrythng query help
```