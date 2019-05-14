import React from 'react';
import {Col, Container, Row,} from 'reactstrap';
import classes from "../../../../css/index.css";

export default class SectionOne extends React.Component {

    render() {
        return (
            <section className={'section _1'}>
                <Container className={classes.container}>
                    <Row>
                        <Col xs="6">
                            <div className={'sous_titre'}>
                                <h2 className={'titre'}>
                                    OPTIMIPS - TC</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad culpa dolorum et id illo iste laborum nostrum numquam officia quam quia, quibusdam sint unde velit voluptatem. A aut consequatur fuga inventore maiores nostrum quos repellat vero. Assumenda, aut commodi consectetur deserunt distinctio dolorem, ex expedita, fugiat illum impedit ipsam libero obcaecati odio pariatur repellat rerum veritatis voluptas voluptatum! Est fugit illo iusto praesentium saepe? Corporis delectus modi quidem sed. Ab cupiditate debitis dicta, error exercitationem ipsum iste qui quo rem saepe sapiente sunt. Aspernatur dolorum fugit mollitia necessitatibus soluta, veniam voluptate. Ab, asperiores, omnis! Eos fugit inventore quasi unde veniam?
                                </p>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        );
    }
}