'use client'
import { SegmentedControl, Text, Accordion, ActionIcon, AspectRatio, Burger, CopyButton, rem, Tooltip, Paper, Button } from "@mantine/core";
import elements from './elements.js'
import { IconBlob, IconBrandGithub, IconCheck, IconCopy, IconCube, IconZoomCode } from "@tabler/icons-react";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconMessages,
  IconTopologyFull,
  IconSettings,
  IconMath,
  IconUsers,
  IconFileAnalytics,
  IconReceiptRefund,
  IconQuestionMark,
  IconHome2
} from '@tabler/icons-react';
import classes from './NavbarSegmented.module.css';
import { useState, forwardRef, useEffect } from "react";
import Link from "next/link.js";

const tabs = {
  account: [
    { link: '', label: 'Who am I', icon: IconQuestionMark },
    { link: '', label: 'What do i do', icon: IconQuestionMark },
    { link: '', label: 'What did I do', icon: IconCube },
    { link: '', label: 'My interests', icon: IconQuestionMark },
  ],
  general: [
    { link: '', label: 'Orders', icon: IconShoppingCart },
    { link: '', label: 'Receipts', icon: IconLicense },
    { link: '', label: 'Reviews', icon: IconMessage2 },
    { link: '', label: 'Messages', icon: IconMessages },
    { link: '', label: 'Customers', icon: IconUsers },
    { link: '', label: 'Refunds', icon: IconReceiptRefund },
    { link: '', label: 'Files', icon: IconFileAnalytics },
  ],
  bruh: [
    { link: '', label: 'Orders', icon: IconShoppingCart },
    { link: '', label: 'Receipts', icon: IconLicense },
    { link: '', label: 'Reviews', icon: IconMessage2 },
    { link: '', label: 'Messages', icon: IconMessages },
    { link: '', label: 'Customers', icon: IconUsers },
    { link: '', label: 'Refunds', icon: IconReceiptRefund },
    { link: '', label: 'Files', icon: IconFileAnalytics },
  ],
};

interface NavbarSegmentedProps {
  opened: boolean;
}



export default function Home() {

const burgerDivStyles: React.CSSProperties = {
    position: 'fixed',
    top: 8,
    left: 8,
    padding: '10px',
    transform: 'scale(1.5)',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
};
  
  const burgerStyles: React.CSSProperties = {
    rotate: '-5deg',
    // width: '20%',
  };



  const [opened, { toggle, open, close }] = useDisclosure();
  const [curOpened, setCurOpened] = useState(false);
  const ref = useClickOutside(() => setCurOpened(false));

  useEffect(() => {
    if (curOpened) {
      open();  // Sets 'opened' to true
    } else {
      close();  // Sets 'opened' to false
    }
  }, [curOpened, open, close]);

  function burgerFunc() {
    setCurOpened(value => !value);
  }


  const items = elements.map((item, index) => (
    <Accordion.Item key={index} value={item.title}>
      <Accordion.Control icon={item.emoji}>{item.title}</Accordion.Control>
      <Accordion.Panel>{item.innerText}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div style={{display: 'flex' }} className={opened ? classes.dimBG : classes.undimBG}>
      <title> Homam Mousa </title>
      <div className={classes.fixedfull}></div>
      <div ref={ref}>
        <NavbarSegmented opened={curOpened} />
        <div style={burgerDivStyles}>
              <Burger style={burgerStyles} opened={opened} onClick={burgerFunc} aria-label="Toggle navigation" />
        </div>
      </div>
      <div className="" style={{marginLeft: 30 }}>
        <br/>
        <br/>
        <h1 className="text-9xl mt-10"> Yo </h1>
        <h2 className="text-7xl mt-10 mb-8"> Whats up</h2>
        <p> 
          {`I'm Homam Mousa and currently studying International Computer Science and Media at HTW.
          Even though I love programming that's not the only thing I'm passionate about`}
        </p>

        <h1 className="text-9xl mt-10"> {`What I do and learn about`} </h1>
        {/* <ul>
          <li> Programming (duh) </li>
          <li> Math </li>
          <li> Martial Arts </li>
        </ul> */}
          <Accordion variant="default" radius="xl">
              {items}
          </Accordion>
          <div className="flex items-center justify-center h-full">
            <span> Wilhelminenhofstraße 75A, 12459 Berlin, Germany </span>
              <CopyButton value="Wilhelminenhofstraße 75A, 12459 Berlin, Germany" timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
            </CopyButton>
          </div>
          <br/>
          <br/>
      </div>
    </div>
  );
  
}
const NavbarSegmented = forwardRef<HTMLDivElement, NavbarSegmentedProps>(function NavbarSegmented(props, ref) {
  const [section, setSection] = useState<'account' | 'general' | 'bruh'>('account');
  const [active, setActive] = useState('Billing');

  useEffect(() => {
    setSection('account');
  }, [props.opened]);

  const links = tabs[section].map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={props.opened ? classes.navbar : classes.navbarOut} ref={ref}>
      <br/>
      <br/>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
          homammousa15@gmail.com
        </Text>
        <SegmentedControl
          value={section}
          onChange={(value: any) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: 'About me', value: 'account' },
            { label: 'Portfolio', value: 'general' },
            { label: 'System', value: 'bruh' },
          ]}
        />
      </div>

      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <Link href="https://github.com/IMIHonigmann" className={classes.link}>
          <IconBrandGithub className={classes.linkIcon} stroke={1.5} />
          <span>Github</span>
        </Link>
        <Link href="/animation" className={classes.link}>
          <IconZoomCode className={classes.linkIcon} stroke={1.5} />
          <span> Behind The Scenes & Progress </span>
        </Link>
        <Link href="/#" className={classes.link}>
          <IconHome2 className={classes.linkIcon} stroke={1.5} />
          <span> Home </span>
        </Link>
        <Link href="/math" className={classes.link}>
          <IconMath className={classes.linkIcon} stroke={1.5} />
          <span> Math </span>
        </Link>
        <Link href="/DSA" className={classes.link}>
          <IconTopologyFull className={classes.linkIcon} stroke={1.5} />
          <span>Algorithms & Datastructures (DSA)</span>
        </Link>
      </div>
    </nav>
  );
});