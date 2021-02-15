/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import { Textarea } from '@chakra-ui/core';
import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

const Reply = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id="Reply" type="button" >
        Odgovori
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Reply" toggle={toggle}>
        <PopoverHeader>
            Tvoj odgovor:</PopoverHeader>
        <PopoverBody>
            <Textarea bg = "gray.100"/>
        </PopoverBody>
      </Popover>
    </div>
  );
}

export default Reply;