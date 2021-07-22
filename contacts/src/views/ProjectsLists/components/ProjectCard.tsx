import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Project } from '../types';

function ProjectCard(props: Project) {
    const { end, id, name, neededSupport, start, status } = props;

    return (
        <Card key={id} data-project-id={id}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography color="textSecondary">{neededSupport}</Typography>
                <Typography variant="body2">
                    {start} - {end}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    );
}

export default ProjectCard;
