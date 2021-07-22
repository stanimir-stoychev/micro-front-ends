import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ComponentProps = {
    id?: string;
};

function View({ id = 'id' }: ComponentProps) {
    const { proposalId = 'undefined' } = useParams<{ proposalId: string }>();
    const [stateId, setId] = useState(id);

    useEffect(() => {
        console.log('Pre:\t', stateId);

        setTimeout(() => {
            setId('new one');
        }, 1500);
    }, [stateId]);

    return (
        <>
            <h1>This is a shared page from "Contacts UI"</h1>
            <pre>{proposalId}</pre>
        </>
    );
}

View.displayName = 'Candidate Proposal';
export default View;
