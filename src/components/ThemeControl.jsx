import React, { useContext } from 'react';
import { Card, FormCheck, Col, Row } from 'react-bootstrap';
import { ThemeContext, DARK_THEME, LIGHT_THEME } from '../ThemeSwitcher';

const ThemeControl = () => {
  const { theme, color, setTheme } = useContext(ThemeContext);

  const handleChange = ({ target }) => setTheme(target.value);

  return (
    <Card bg={theme} text={color}>
      <Card.Header>Theme</Card.Header>
      <Card.Body>
        <Row>
          {[LIGHT_THEME, DARK_THEME].map(t => (
            <Col md="2">
              <FormCheck
                checked={theme === t}
                type="radio"
                label={t}
                name="theme"
                value={t}
                onChange={handleChange}
              />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ThemeControl;
