'use client'

import { useEffect, useState } from 'react'
import { Search, ShoppingCart, X, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartPopup, { CartItem } from '@/components/cartPopup'
import { getAllMedications } from '../api/medicatiion'


export interface Medication {
    id: string; // UUID as a string
    image_url: string; // Matches the `ImageURL` field
    stock: number; // Matches the `Stock` field
    name: string; // Matches the `Name` field
    price: number; // Matches the `Price` field (int64 can be represented as a number in JS/TS)
    description: string; // Matches the `Description` field
    requiresPrescription: boolean; // Matches the `RequiresPrescription` field
    createdAt: string; // ISO date format as a string, time.Time in Go corresponds to Date in JS/TS
    updatedAt: string; // ISO date format as a string
  }


  export default function EnhancedMedicationSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [medications, setMedications] = useState<Medication[]>([]); // State for medications
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showQuantityPopup, setShowQuantityPopup] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
    const [quantity, setQuantity] = useState(1);
  
    // Fetch medications on component mount
    useEffect(() => {
      async function fetchMedications() {
        try {
          const fetchedMedications = await getAllMedications();
          setMedications(fetchedMedications);
        } catch (error) {
          console.error('Failed to fetch medications:', error);
        }
      }
  
      fetchMedications();
    }, []);
  
    const addToCart = (medication: Medication) => {
      setSelectedMedication(medication);
      setQuantity(1);
      setShowQuantityPopup(true);
    };
  
    const loadCartFromStorage = (): void => {
      const storedCart = localStorage.getItem('userCart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setShowCart(true);
    };
  
    const confirmAddToCart = () => {
      let storedCart = localStorage.getItem('userCart');
      let newCart: CartItem[] = [];
  
      if (storedCart) {
        newCart = JSON.parse(storedCart);
      }
  
      const existingItem = newCart.find(item => item.id === selectedMedication?.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        if (selectedMedication) {
          newCart.push({
            id: selectedMedication.id,
            name: selectedMedication.name,
            quantity,
            price: selectedMedication.price,
            image: selectedMedication.image_url,
          });
        }
      }
      setCart(newCart);
      localStorage.setItem('userCart', JSON.stringify(newCart));
      setShowQuantityPopup(false);
    };
  
    const removeFromCart = (medicationId: string) => {
      const newCart = cart.filter(item => item.id !== medicationId);
      setCart(newCart);
      localStorage.setItem('userCart', JSON.stringify(newCart));
    };
  
    const totalPrice = cart.reduce((total, item) => {
      const medication = medications.find(med => med.id === item.id);
      return total + (medication ? medication.price * item.quantity : 0);
    }, 0);
  
    return (
      <div className="min-h-screen bg-[#FFF2F7] font-gloock">
        <div className="px-10 py-20 md:py-30 md:px-20 lg:py-36 lg:px-40">
          <div className='flex flex-row justify-between items-center mb-4'>
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-7xl font-bold mb-4">What do you need?</h1>
            <div className='sm:block hidden'>
              <Button
                className='bg-[#FFD3E4] text-pink-600 hover:bg-pink-200'
                size={'lg'}
                onClick={() => {
                  loadCartFromStorage();
                  setShowCart(true);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                View My Cart
              </Button>
            </div>
          </div>
  
          <div className="relative mb-6 rounded-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
  
          <div className='sm:hidden flex w-full justify-end mb-5'>
            <Button
              className='bg-[#FFD3E4] text-pink-600 hover:bg-pink-200'
              size={'lg'}
              onClick={() => {
                loadCartFromStorage();
                setShowCart(true);
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              View My Cart
            </Button>
          </div>
  
          <div className="flex flex-wrap flex-row sm:justify-start justify-center w-full gap-5 ">
            {medications
              .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((med) => (
                <div key={med.id} className="bg-[#FFD3E4] rounded-lg shadow-md w-[250px] overflow-hidden">
                  <img src={med.image_url} alt={med.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1">{med.name}</h3>
                    <p className="text-pink-600 font-bold mb-2">Rp{med.price.toLocaleString()}</p>
                    <div className="flex w-full gap-3">
                      <button
                        className="bg-pink-100 text-pink-600 w-full px-4 py-1 rounded-lg text-sm"
                        onClick={() => addToCart(med)}
                      >
                        Add
                      </button>
                      <button className="bg-gray-100 text-gray-600 w-full px-4 py-1 rounded-lg text-sm">More</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
  
        {showCart && (
          <CartPopup
            onClose={() => setShowCart(false)}
            onRemove={removeFromCart}
          />
        )}
  
        {showQuantityPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#FFF2F7] p-8 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Select Quantity</h2>
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-pink-200 text-pink-600 p-2 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-4 text-2xl">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-pink-200 text-pink-600 p-2 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  onClick={() => setShowQuantityPopup(false)}
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmAddToCart}
                  className="bg-pink-500 text-white hover:bg-pink-600"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }