import { Footer } from "flowbite-react";
import { PATH } from "../utils/path";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Logo from "../assets/images/logo.png";
const customTheme = {
  root: {
    base: "w-full bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
    container: "w-full p-6",
    bgDark: "bg-gray-800",
  },
  groupLink: {
    base: "flex flex-wrap text-sm text-gray-500 dark:text-white",
    link: {
      base: "me-4 last:mr-0 md:mr-6",
      href: "hover:underline",
    },
    col: "flex-col space-y-4",
  },
  icon: {
    base: "text-gray-500 dark:hover:text-white",
    size: "h-5 w-5",
  },
  title: {
    base: "mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white",
  },
  divider: {
    base: "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8",
  },
  copyright: {
    base: "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
    href: "ml-1 hover:underline",
    span: "ml-1",
  },
  brand: {
    base: "mb-4 flex items-center sm:mb-0",
    img: "mr-3 h-8",
    span: "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white",
  },
};

function FooterComponent() {
  return (
    <Footer container bgDark theme={customTheme}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src={Logo}
              alt="Loadify Logo"
              name="Loadify"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            {/* About */}
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href={PATH.ABOUTUS}>Loadify</Footer.Link>
                <Footer.Link href={PATH.ABOUTUS}>Dispatch Services</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Followus */}
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/Haris-6/">Github</Footer.Link>
                <Footer.Link href="https://github.com/Haris-6/">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* Legal */}
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />

        {/* social media icon */}
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Logistic System" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComponent;
