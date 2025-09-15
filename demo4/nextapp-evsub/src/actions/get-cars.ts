'use server';
import { CarInfo, CarGroupInfo, Suggestions, Suggestion } from "@/types";

export async function getSuggestions(suggestion: string, suggestionCount: number): Promise<Suggestions> {
  // Simulate fetching related group suggestions
  await new Promise(resolve => setTimeout(resolve, 500));

  const groupOption1: Suggestion[] = [
    { name: "Weekend Warrior", shortName: "Weekend" },
    { name: "Daily Commuter", shortName: "Commuter" },
    { name: "Budget Conscious", shortName: "Budget" },
    { name: "Family Adventurer", shortName: "Family" },
    { name: "Urban Stylist", shortName: "Urban" },
    { name: "Vans/People Movers", shortName: "Vans" }
  ];
  const groupOption2: Suggestion[] = [
    { name: "Hatchback", shortName: "Hatch" },
    { name: "Sedan", shortName: "Sedan" },
    { name: "Small SUV", shortName: "Small SUV" },
    { name: "Medium SUV", shortName: "Medium SUV" },
    { name: "Large SUV", shortName: "Large SUV" },
    { name: "Vans/People Movers", shortName: "Vans" }
  ];
  const groupOption3: Suggestion[] = [
    { name: "Australia's Top 10 Best Sellers", shortName: "Australia's Top 10" },
    { name: 'Most Chosen Vehicle This Month', shortName: 'Most Chosen' },
    { name: 'Newest Arrivals', shortName: 'Newest Arrivals' },
  ];
  const groupOption4: Suggestion[] = [
    { name: "Long Range (500km+)", shortName: "Long Range" },
    { name: "Standard Range (300-499km)", shortName: "Standard Range" },
    { name: "City Range (under 300km)", shortName: "City Range" },
  ];


  if (suggestionCount % 4 === 0) {
    return {
      name: "Vehicle Types",
      groups: groupOption1
    }
  }
  else if (suggestionCount % 4 === 1) {
    return {
      name: "Vehicle Types",
      groups: groupOption2
    }
  }
  else if (suggestionCount % 4 === 2) {
    return {
      name: "Most Popular",
      groups: groupOption3
    }
  }
  
  return {
      name: "Range ",
      groups: groupOption4
    }
}

export async function getCarGroupsFrom(suggestion: string): Promise<CarGroupInfo[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // For simplicity, return all car groups regardless of suggestion
  return getCarGroups();
}

export async function getCars(group: string): Promise<CarInfo[]> {
  return [
    {
      id: "1",
      title: "KIA EV5",
      subtitle: "Earth 2025",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
      img: "/images/KIA EV5 Earth 2025.png",
      criteria: {
        "Weekly Cost": "$295.80",
        "Odometer": "43,793 km",
        "Fuel Efficiency": "15.5 km/L",
        "Service Due": "8,000km",
        "Next Service Date": "15 Aug 2044",
        "Loan": "$195.80",
        "Subscription": "$195.80",
        "Lease": "$195.80",
      }
    },
    {
      id: "2",
      title: "Tesla Model 3",
      subtitle: "Earth 2025",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
      img: "/images/Tesla Model 3 Earth 2025.png",
      criteria: {
        "Weekly Cost": "$295.80",
        "Odometer": "43,793 km",
        "Fuel Efficiency": "15.5 km/L",
        "Service Due": "8,000km",
        "Next Service Date": "15 Aug 2044",
        "Loan": "$195.80",
        "Subscription": "$195.80",
        "Lease": "$195.80",
      }
    },
    {
      id: "3",
      title: "BMW I4",
      subtitle: "EDrive35 2023",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
      img: "/images/BMW I4 EDrive35 2023.png",
      criteria: {
        "Weekly Cost": "$325.50",
        "Odometer": "43,793 km",
        "Fuel Efficiency": "12.5 km/L",
        "Service Due": "5,000km",
        "Next Service Date": "15 March 2044",
        "Loan": "$295.80",
        "Subscription": "$295.80",
        "Lease": "$295.80",
      }
    },
    {
      id: "4",
      title: "Volvo EX30",
      subtitle: "Ultra Single Motor 2023",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
      img: "/images/Volvo EX30.png",
      criteria: {
        "Weekly Cost": "$325.50",
        "Odometer": "43,793 km",
        "Fuel Efficiency": "12.5 km/L",
        "Service Due": "5,000km",
        "Next Service Date": "15 March 2044",
        "Loan": "$295.80",
        "Subscription": "$295.80",
        "Lease": "$295.80",
      }
    },
  ];
}

export async function getCarGroups(): Promise<CarGroupInfo[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      name: "Local Trips",
      carInfos: [
        {
          id: "1",
          title: "KIA EV5",
          subtitle: "Earth 2025",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/KIA EV5 Earth 2025.png",
          criteria: {
            "Weekly Cost": "$295.80",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "15.5 km/L",
            "Service Due": "8,000km",
            "Next Service Date": "15 Aug 2044",
            "Loan": "$195.80",
            "Subscription": "$195.80",
            "Lease": "$195.80",
          }
        },
        {
          id: "2",
          title: "Tesla Model 3",
          subtitle: "Earth 2025",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/Tesla Model 3 Earth 2025.png",
          criteria: {
            "Weekly Cost": "$295.80",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "15.5 km/L",
            "Service Due": "8,000km",
            "Next Service Date": "15 Aug 2044",
            "Loan": "$195.80",
            "Subscription": "$195.80",
            "Lease": "$195.80",
          }
        },
        {
          id: "3",
          title: "BMW I4",
          subtitle: "EDrive35 2023",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/BMW I4 EDrive35 2023.png",
          criteria: {
            "Weekly Cost": "$325.50",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "12.5 km/L",
            "Service Due": "5,000km",
            "Next Service Date": "15 March 2044",
            "Loan": "$295.80",
            "Subscription": "$295.80",
            "Lease": "$295.80",
          }
        },
        {
          id: "4",
          title: "Volvo EX30",
          subtitle: "Ultra Single Motor 2023",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/Volvo EX30.png",
          criteria: {
            "Weekly Cost": "$325.50",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "12.5 km/L",
            "Service Due": "5,000km",
            "Next Service Date": "15 March 2044",
            "Loan": "$295.80",
            "Subscription": "$295.80",
            "Lease": "$295.80",
          }
        },
      ]
    },
    {
      id: "2",
      name: "Road Trips",
      carInfos: [
        {
          id: "5",
          title: "BMW I4",
          subtitle: "EDrive35 2023",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/BMW I4 EDrive35 2023.png",
          criteria: {
            "Weekly Cost": "$325.50",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "12.5 km/L",
            "Service Due": "5,000km",
            "Next Service Date": "15 March 2044",
            "Loan": "$295.80",
            "Subscription": "$295.80",
            "Lease": "$295.80",
          }
        },
        {
          id: "6",
          title: "KIA EV5",
          subtitle: "Earth 2025",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/KIA EV5 Earth 2025.png",
          criteria: {
            "Weekly Cost": "$295.80",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "15.5 km/L",
            "Service Due": "8,000km",
            "Next Service Date": "15 Aug 2044",
            "Loan": "$195.80",
            "Subscription": "$195.80",
            "Lease": "$195.80",
          }
        },
        {
          id: "7",
          title: "Tesla Model 3",
          subtitle: "Earth 2025",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/Tesla Model 3 Earth 2025.png",
          criteria: {
            "Weekly Cost": "$295.80",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "15.5 km/L",
            "Service Due": "8,000km",
            "Next Service Date": "15 Aug 2044",
            "Loan": "$195.80",
            "Subscription": "$195.80",
            "Lease": "$195.80",
          }
        },
        {
          id: "8",
          title: "Volvo EX30",
          subtitle: "Ultra Single Motor 2023",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/Volvo EX30.png",
          criteria: {
            "Weekly Cost": "$325.50",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "12.5 km/L",
            "Service Due": "5,000km",
            "Next Service Date": "15 March 2044",
            "Loan": "$295.80",
            "Subscription": "$295.80",
            "Lease": "$295.80",
          }
        },
      ]
    },
    {
      id: "3",
      name: "Weekend Drives",
      carInfos: [
        {
          id: "9",
          title: "Volvo EX30",
          subtitle: "Ultra Single Motor 2023",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/Volvo EX30.png",
          criteria: {
            "Weekly Cost": "$325.50",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "12.5 km/L",
            "Service Due": "5,000km",
            "Next Service Date": "15 March 2044",
            "Loan": "$295.80",
            "Subscription": "$295.80",
            "Lease": "$295.80",
          }
        },
        {
          id: "10",
          title: "BMW I4",
          subtitle: "EDrive35 2023",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/BMW I4 EDrive35 2023.png",
          criteria: {
            "Weekly Cost": "$325.50",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "12.5 km/L",
            "Service Due": "5,000km",
            "Next Service Date": "15 March 2044",
            "Loan": "$295.80",
            "Subscription": "$295.80",
            "Lease": "$295.80",
          }
        },
        {
          id: "11",
          title: "KIA EV5",
          subtitle: "Earth 2025",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/KIA EV5 Earth 2025.png",
          criteria: {
            "Weekly Cost": "$295.80",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "15.5 km/L",
            "Service Due": "8,000km",
            "Next Service Date": "15 Aug 2044",
            "Loan": "$195.80",
            "Subscription": "$195.80",
            "Lease": "$195.80",
          }
        },
        {
          id: "12",
          title: "Tesla Model 3",
          subtitle: "Earth 2025",
          description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
          img: "/images/Tesla Model 3 Earth 2025.png",
          criteria: {
            "Weekly Cost": "$295.80",
            "Odometer": "43,793 km",
            "Fuel Efficiency": "15.5 km/L",
            "Service Due": "8,000km",
            "Next Service Date": "15 Aug 2044",
            "Loan": "$195.80",
            "Subscription": "$195.80",
            "Lease": "$195.80",
          }
        }
      ]
    },
    // {
    //   id: "4",
    //   name: "Luxury Rides",
    //   carInfos: [
    //     {
    //       id: "13",
    //       title: "Tesla Model 3",
    //       subtitle: "Earth 2025",
    //       description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    //       img: "/images/Tesla Model 3 Earth 2025.png",
    //       criteria: {
    //         "Weekly Cost": "$295.80",
    //         "Odometer": "43,793 km",
    //         "Fuel Efficiency": "15.5 km/L",
    //         "Service Due": "8,000km",
    //         "Next Service Date": "15 Aug 2044",
    //         "Loan": "$195.80",
    //         "Subscription": "$195.80",
    //         "Lease": "$195.80",
    //       }
    //     },
    //     {
    //       id: "14",
    //       title: "KIA EV5",
    //       subtitle: "Earth 2025",
    //       description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    //       img: "/images/KIA EV5 Earth 2025.png",
    //       criteria: {
    //         "Weekly Cost": "$295.80",
    //         "Odometer": "43,793 km",
    //         "Fuel Efficiency": "15.5 km/L",
    //         "Service Due": "8,000km",
    //         "Next Service Date": "15 Aug 2044",
    //         "Loan": "$195.80",
    //         "Subscription": "$195.80",
    //         "Lease": "$195.80",
    //       }
    //     },
    //     {
    //       id: "15",
    //       title: "Volvo EX30",
    //       subtitle: "Ultra Single Motor 2023",
    //       description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    //       img: "/images/Volvo EX30.png",
    //       criteria: {
    //         "Weekly Cost": "$325.50",
    //         "Odometer": "43,793 km",
    //         "Fuel Efficiency": "12.5 km/L",
    //         "Service Due": "5,000km",
    //         "Next Service Date": "15 March 2044",
    //         "Loan": "$295.80",
    //         "Subscription": "$295.80",
    //         "Lease": "$295.80",
    //       }
    //     },
    //     {
    //       id: "16",
    //       title: "BMW I4",
    //       subtitle: "EDrive35 2023",
    //       description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    //       img: "/images/BMW I4 EDrive35 2023.png",
    //       criteria: {
    //         "Weekly Cost": "$325.50",
    //         "Odometer": "43,793 km",
    //         "Fuel Efficiency": "12.5 km/L",
    //         "Service Due": "5,000km",
    //         "Next Service Date": "15 March 2044",
    //         "Loan": "$295.80",
    //         "Subscription": "$295.80",
    //         "Lease": "$295.80",
    //       }
    //     },
    //   ]
    // }
  ];
}