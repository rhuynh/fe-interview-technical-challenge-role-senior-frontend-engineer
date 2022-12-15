import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { PolicyHolder as PolicyHolderType } from '../../types/PolicyHolder';
import PolicyHolder from '../PolicyHolder/PolicyHolder';


// went w/ using a cache variable outside function component
// would love to know if there's a cleaner/simpler approach to solve this problem
let cachedPolicyHolders: PolicyHolderType[] | null = null;

export default function PolicyHolderView() {
  const [policyHolders, setPolicyHolders] = useState<PolicyHolderType[] | null>(null);

  useEffect(() => {
    if (!cachedPolicyHolders) {
      fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        setPolicyHolders(data.policyHolders);
        cachedPolicyHolders = data.policyHolders;
      })
      .catch(e => console.error('failed to fetch policyholders!'));
    } else {
      setPolicyHolders(cachedPolicyHolders);
    }
  }, [policyHolders]);

  const onClick = () => {
    fetch('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "Fred Rogers",
        "age": 74,
        "address": {
          "line1": "1300 Beechwood Blvd",
          "city": "Pittsburgh",
          "state": "PA",
          "postalCode": "15217",
        },
        "phoneNumber": "123-45-6789",
      })
    })
    .then(res => res.json())
    .then(({ policyHolders }) => {
      cachedPolicyHolders = policyHolders;
      setPolicyHolders(policyHolders);
    })
    .catch(e => console.error('failed to add policyholder!'));
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      {policyHolders?.map((policyHolder, i) => (
        <PolicyHolder data-testid={`policyholder-${i}`} policyHolder={policyHolder} key={i} />
      ))}
      <Box data-testid="foobar" sx={{
        paddingTop: '10px',
        textAlign: 'center',
      }}>
        <Button 
          variant="contained"
          size="large"
          onClick={onClick}
        >
          Add a policyholder
        </Button>
      </Box>
      <Box textAlign="left">
        <ul>
        TODO:
          <li>Fix hard-coded data when adding policyholder by introducing a form to capture data used for submission</li>
          <li>Add remove ability</li>
          <li>Add update ability</li>
          <li>Add proper error handling</li>
          <li>Display loader for api fetches</li>
          <li>Make "Add a policyholder" button "sticky" so that it will always remain in viewport</li>
          <li>Write unit tests for components</li>
        </ul>
      </Box>
    </Box>
  );
}
