import { Box } from '@mui/material';
import get from '../../utils/get';
import InfoTable from '../InfoTable/InfoTable';
import { PolicyHolder as PolicyHolderType } from '../../types/PolicyHolder';

const rowMappings = [
    { label: 'Name', path: 'name' },
    { label: 'Age', path: 'age' },
    { label: 'Address', path: ({ address: { line1, line2, postalCode, state }}: PolicyHolderType) => {
        return `
        ${line1}
        ${line2 ?? ''}
        ${postalCode}, ${state}
        `.replace(/^\s+/gm, '')
    } },
    { label: 'Phone number', path: 'phoneNumber' },
    { label: 'Primary policyholder?', path: (obj: any) => obj.isPrimary ? 'Yes' : 'No' },
];

type PolicyHolderProps = { 
    policyHolder: PolicyHolderType, 'data-testid'?: string 
};

export default function PolicyHolder({ policyHolder, 'data-testid': dataTestId }: PolicyHolderProps) {
    const rows = rowMappings.map(((mapping, i) => {
        const { label, path } = mapping;
        return {
        key: label,
        value: get(policyHolder, path)
        };
    }));

    return (
        <Box
            data-testid={dataTestId} 
            sx={{
                mb: 3
            }}
        >
            <InfoTable header="Policy Holder" rows={rows} />
        </Box>
    );
};
