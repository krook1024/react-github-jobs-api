import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Job({ job }) {
    const [open, setOpen] = useState(false);
    const tog = () => {
        setOpen(!open);
    };
    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {job.title} -{' '}
                            <span className="text-muted font-weight-light">
                                {job.company}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {new Date(job.created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="primary" className="mr-2">
                            {job.type}
                        </Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                        <div>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img
                        className="d-none d-md-block"
                        height="50"
                        alt={job.company}
                        src={job.company_logo}
                    />
                </div>
                <Card.Text>
                    <Button variant="primary" onClick={tog}>
                        {(!open && 'View Details') || 'Hide Details'}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-3">
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}
