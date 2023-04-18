
import '../../pages/style.css';

import { useState, useEffect, React } from 'react'
import '../../pages/style.css';

import { Container, Row, Col } from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import axios from 'axios';

const API_KEY = 'YOUR KEY'


function Home() {

  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {

    // setLoading(true);
    console.log("loading", loading);
    try {
      var data = JSON.stringify({
        "query": "query MyQuery {\n  EVM(dataset: combined, network: eth) {\n    BalanceUpdates(\n      where: {BalanceUpdate: {Address: {is: \"0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03\"}}, Currency: {Fungible: false}}\n      limit: {count: 50}\n      orderBy: {descendingByField: \"balance\"}\n    ) {\n      Currency {\n        Name\n        SmartContract\n      }\n      balance: sum(of: BalanceUpdate_Amount)\n      BalanceUpdate {\n        URI\n        Address\n        Id\n      }\n    }\n  }\n}\n",
        "variables": "{}"
      });

      var config = {
        method: 'post',
        url: 'https://streaming.bitquery.io/graphql',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY
        },
        data: data
      };

      const response = await axios(config);
      // setLoading(false);
      console.log('response', response)
      setBalances(response?.data?.data?.EVM?.BalanceUpdates);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    finally {
      setLoading(false); // Set loading to false once the response is received
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="project-background">
      <Container className="project-section">
        <Row>
          <Col md={7}>
            <h2 className="headtext">
              Hello <span className="wave">👋 </span>
            </h2>
            <h2 className="nametext">I'm Bitquery</h2>
            <h3 className="nametext-h3">NFT Creator</h3>
          </Col>
        </Row>
        <h1 className="nametext" style={{ textAlign: "center" }}>My NFT Art</h1>
        <Container className="project-section">
          {loading ? (

            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : <Row className="justify-content-center">
            {
                balances.map((balance) => (
                  <Col key={`${balance.BalanceUpdate.Id}-${balance.balance}`} md={4}>
                    <div className="project-card">
                      <div className="project-card-view">
                        <img src={require('../../Assets/BAYC.svg').default}  className="project-card-image" />
                        {/* <div className="project-card-content"> */}
                        
                        {/* </div> */}
                        <BalanceCard balance={balance} />
                        <a href="https://opensea.io/" className="project-card-button" target='_blank'>Buy now</a>

                      </div>
                     
                    </div>
                  </Col>
            
            ))}
        </Row>

          }
      </Container>
    </Container>
    </div >

  );
}


function BalanceCard({ balance }) {
  const { BalanceUpdate, balance: amount, Currency } = balance;
  const { Address, URI, Id } = BalanceUpdate;
  const { Name: CurrencyName } = Currency;
  return (
    <div className="project-card project-section">
      <Card className="project-card-view">
        <Card.Title style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#03dac6' }}>{CurrencyName}</Card.Title>

        <p>Address: {Address}</p>
        <p>Amount: {amount}</p>
        <p>ID: {Id}</p>


        <Button className="view-btn" variant="primary" href={URI} target="_blank">
          View URI
        </Button>
      </Card>
    </div>
  );
}

export default Home