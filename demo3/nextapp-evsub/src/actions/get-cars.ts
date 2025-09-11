'use server';
import { CarInfo, CarGroupInfo } from "@/types";

export async function getCarGroups(): Promise<CarGroupInfo[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      name: "Local Trips",
      carInfos: [
        {
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
      ]
    },
    {
      id: 2,
      name: "Road Trips",
      carInfos: [
        {
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
      ]
    },
    {
      id: 3,
      name: "Weekend Drives",
      carInfos: [
        {
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
    //   id: 4,
    //   name: "Luxury Rides",
    //   carInfos: [
    //     {
    //       title: "Tesla Model 3",
    //       subtitle: "Earth 2025",
    //       description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    //       img: "/images/Tesla Model 3 Earth 2025.png",
    //       priority: 1,
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
    //   ]
    // }
  ];
}