import requests
import pprint

# Add your org PAT and change api calls if needed
headers = {"Authorization": "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXYuZGV2cmV2LWVuZy5haS8iLCJraWQiOiJzdHNfa2lkX3JzYSIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzFDZmRGZmJqZTpkZXZ1LzEiLCJleHAiOjE3OTU0MzgzODgsImh0dHA6Ly9kZXZyZXYuYWkvYXV0aDBfdWlkIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvL3N1cGVyOmF1dGgwX3VzZXIvZ29vZ2xlLW9hdXRoMnwxMTc4MDgzMzQ0MTI4OTYxMzIyOTQiLCJodHRwOi8vZGV2cmV2LmFpL2F1dGgwX3VzZXJfaWQiOiJnb29nbGUtb2F1dGgyfDExNzgwODMzNDQxMjg5NjEzMjI5NCIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2b19kb24iOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vMUNmZEZmYmplIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtMUNmZEZmYmplIiwiaHR0cDovL2RldnJldi5haS9kZXZ1aWQiOiJERVZVLTEiLCJodHRwOi8vZGV2cmV2LmFpL2Rpc3BsYXluYW1lIjoiaS1yYWRvdmFuLWpvcmdpYyIsImh0dHA6Ly9kZXZyZXYuYWkvZW1haWwiOiJpLXJhZG92YW4uam9yZ2ljQGRldnJldi5haSIsImh0dHA6Ly9kZXZyZXYuYWkvZnVsbG5hbWUiOiJSYWRvdmFuIEpvcmdpYyIsImh0dHA6Ly9kZXZyZXYuYWkvaXNfdmVyaWZpZWQiOnRydWUsImh0dHA6Ly9kZXZyZXYuYWkvdG9rZW50eXBlIjoidXJuOmRldnJldjpwYXJhbXM6b2F1dGg6dG9rZW4tdHlwZTpwYXQiLCJpYXQiOjE3MDA4MzAzODgsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXYuZGV2cmV2LWVuZy5haS8iLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vMUNmZEZmYmplOnRva2VuL0J0OXdYcDk1Iiwib3JnX2lkIjoib3JnX09sNVdIcEVHNWNhV0U0Z2oiLCJzdWIiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vMUNmZEZmYmplOmRldnUvMSJ9.vB1lTU_U3fU7W4dnCvtik5C81EXQ8dIVXq0xWnq7awUsy_pM5jzrzA8vsI2-M1XsUiMS4X9XSS2OciaZKUBBtL8QBfyjl4wcOVp0UJITeTN-eunukRoueM7oKY-fcQ1jRHrjJsEVY4ZMKGYrjFRV5tfrpk7Xal7ozDLklyuSK-BnfTNrwO-4mKl1Ffu1Di45HBrHX2_xEDM5elLOEpIbpMkvWfN5_vLc1YKnA-lJqLJleNxZDVmLvhI4ZsC_i-YW0x2VQjzvWXwCM9ae__vBgZ1xL4rWLCvU_2DfBCNTWrXCT-wjF7slgHMbWTXViMH4uxcwGM0swsd9ngRirmkfvA"}
listLink = "https://api.dev.devrev-eng.ai/accounts.list"
deleteLink = "https://api.dev.devrev-eng.ai/accounts.delete"

# Get list of accounts
listResponse = requests.get(listLink, headers=headers)
data = listResponse.json()["accounts"]

# Delete each account one by one
for i in range(len(data)):
    if data[i]["tags"][0]["tag"]["id"] == "don:core:dvrv-us-1:devo/1CfdFfbje:tag/2":
        try:
            delete = requests.post(deleteLink, headers=headers,
                                   json={"id": data[i]["id"]})
            pprint.pp(delete.json())
        except:
            print("error")
    else:
        print("not deleting")