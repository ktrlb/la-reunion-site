const address = {
  street: "2723 Maplewood St",
  city: "Granbury",
  state: "TX",
  zip: "76048",
} as const

export const siteConfig = {
  address,
  contact: {
    email: "info@la-reunion.org",
    phone: "" as string,
  },
  links: {
    donateOnline: "https://fccgranbury.breezechms.com/give/online",
    tafb: "https://tafb.org/",
    get mapUrl() {
      return `https://maps.google.com/?q=${encodeURIComponent(`${address.street} ${address.city} ${address.state} ${address.zip}`)}`
    },
  },
  hours: {
    center: "Monday - Friday: 9:00 AM - 5:00 PM",
    foodPantry: "Every Thursday: 1:00 PM - 4:00 PM",
    afterSchool: "Monday - Friday: 3:00 PM - 6:00 PM (School Year)",
  },
} as const
