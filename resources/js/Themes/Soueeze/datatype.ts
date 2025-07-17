// Start Navbar
export interface NavbarConfig {
    logo: {
        src: string;
        alt: string;
        width: string;
    };
    links: {
        label: string;
        href: string;
    }[];
    loginButton: {
        label: string;
    };
    cartIcon: boolean;
}

// End Navbar

//-----------------------------------------------------

//Start Hero Section
export interface HeroSectionConfig {
    tagline: string;
    title: string;
    subtext: string;
    orderButton: {
        label: string;
        highlight: string;
    };
    socials: {
        platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram';
    }[];
    image: {
        src: string;
        alt: string;
    };
}

//End Hero Section

//-----------------------------------------------------

//Start About Us / Our Story
export interface OurStorySectionConfig {
    sectionTag: string;
    sectionTitle: string;
    description: string;
    readMoreLink: {
        label: string;
        href: string;
    };
    images: {
        background: {
            src: string;
            alt: string;
        };
        foreground: {
            src: string;
            alt: string;
        };
    };
}
//End About Us / Our Story

//-----------------------------------------------------

//Start Highlighted Products
export interface HighlightSectionConfig {
    tagline: string;
    title: string;
    description: string;
    button: {
        label: string;
        href: string;
    };
    backgroundImage: string;
    juices: {
        name: string;
        image: string;
    }[];
}

//End Highlighted Products

//-----------------------------------------------------

//Start Fruits Items
export interface ItemsSectionConfig {
    tagline: string;
    title: string;
    description: string;
    backgroundImage: string;
    items: {
        name: string;
        image: string;
    }[];
}

//End Fruits Items

//-----------------------------------------------------

//Start HandCraftedBowls
export interface HandCraftedBowlsConfig {
    tagline: string;
    title: string;
    description: string;
    pronunciation: string;
    cta: {
        label: string;
        href: string;
    };
    image: {
        src: string;
        alt: string;
    };
}

//End HandCraftedBowls

//-----------------------------------------------------

//Start Rewards Section
export interface RewardsConfig {
    tagline: string;
    title: string;
    backgroundImage: string;
    fields: {
        nameLabel: string;
        phoneLabel: string;
        storeLabel: string;
    };
    consentText: string;
    termsLink: {
        label: string;
        href: string;
    };
    privacyLink: {
        label: string;
        href: string;
    };
    submitButton: {
        label: string;
        loadingLabel: string;
    };
    stores: {
        label: string;
        value: string;
    }[];
}

//End Rewards Section

//-----------------------------------------------------

//Start Gallery
export interface GallerySection {
    instagramLogo: string;
    galleryImages: string[];
    footerLogo: string;
    footerLinks: string[];
    contactPhone: string;
    socialLinks: {
        alt: string;
        link: string;
    }[];
}

//End Gallery

//-----------------------------------------------------

//Start Footer
export interface FooterSection {
  socialIcons: {
    link: string;
    alt: string;
  }[];
  footerLinks: {
    label: string;
    href: string;
  }[];
  copyright: string;
}