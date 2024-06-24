'use client'
import { SegmentedControl, Text, Accordion, ActionIcon, AspectRatio, Burger, CopyButton, rem, Tooltip } from "@mantine/core";
import elements from './elements.js'
import { IconBrandGithub, IconCheck, IconCopy, IconCube } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconTopologyFull,
  IconSettings,
  IconMath,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconQuestionMark,
  IconHome2
} from '@tabler/icons-react';
import classes from './NavbarSegmented.module.css';
import { useState } from "react";
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

export default function Home() {

  const burgerDivStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 8,
    left: 8,
    padding: '10px', // Adjusted padding for better usability
    transform: 'scale(1.5)',
    backgroundColor: 'green',
    width: '100%', // Ensures a fixed width to help with centering
    height: '40px', // To balance the dimensions of the container div
    boxSizing: 'border-box' // Ensure padding/decorations are included in the element's total width and height
  };
  
  const burgerStyles: React.CSSProperties = {
    rotate: '-5deg',
    // width: '20%',
  };



  const [opened, { toggle }] = useDisclosure();
  const items = elements.map((item, index) => (
    <Accordion.Item key={index} value={item.title}>
      <Accordion.Control icon={item.emoji}>{item.title}</Accordion.Control>
      <Accordion.Panel>{item.innerText}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div style={{display: 'flex' }}>
      {opened ? <NavbarSegmented /> : ''}
      <div className="">
        <h1 className="text-9xl mt-10"> Yo </h1>
        <h2 className="text-7xl mt-10 mb-8"> Whats up</h2>
        <p> 
          {`I'm Homam Mousa and currently studying International Computer Science and Media at HTW.
          Even though I love programming that's not the only thing I'm passionate about`}
        </p>

        <h1 className="text-9xl mt-10"> {`What I do`} </h1>
        <ul>
          <li> Programming (duh) </li>
          <li> Math </li>
          <li> Martial Arts </li>
        </ul>
          <Accordion variant="contained" radius="xl">
              {items}
          </Accordion>
          <AspectRatio ratio={16 / 9}>
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.1749122798933!2d13.523384674007643!3d52.45661700362782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a848bc4c146fdd%3A0xcdaef78fbd909c09!2sHochschule%20f%C3%BCr%20Technik%20und%20Wirtschaft%20Berlin%20(HTW%20Berlin)%20-%20Campus%20Wilhelminenhof!5e0!3m2!1sde!2sde!4v1718835047795!5m2!1sde!2sde"
          title="Google map"
          style={{ border: 0 }}
          />
          </AspectRatio>
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
          <div style={burgerDivStyles}>
            <Burger style={burgerStyles} opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          </div>
      </div>
    </div>
  );
  
}
function NavbarSegmented() {
  const [section, setSection] = useState<'account' | 'general'>('account');
  const [active, setActive] = useState('Billing');

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
    <nav className={classes.navbar}>
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
        <Link href="/#" className={classes.link}>
          <IconHome2 className={classes.linkIcon} stroke={1.5} />
          <span> Home </span>
        </Link>
        <Link href="/math" className={classes.link}>
          <IconMath className={classes.linkIcon} stroke={1.5} />
          <span>Math</span>
        </Link>
        <Link href="/DSA" className={classes.link}>
          <IconTopologyFull className={classes.linkIcon} stroke={1.5} />
          <span>Algorithms & Datastructures (DSA)</span>
        </Link>
      </div>
    </nav>
  );
}