import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { postMedicationTransaction } from '@/app/api/medicationService'; // Import the API call

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface CartPopupProps {
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function CartPopup({ onClose, onRemove }: CartPopupProps) {
  
    const storedCart = localStorage.getItem('userCart');
    let newCart: CartItem[] = [];
    if (storedCart) {
      newCart = JSON.parse(storedCart);
    }

    const totalPrice = newCart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        // Format the data for the API
        const checkoutData = {
            allItem: newCart.map(item => ({
                medicationId: item.id,
                name:item.name,
                price: item.price,
                quantity: item.quantity,

            })),
            totalPrice
        };

        try {
            const result = await postMedicationTransaction(checkoutData);
            localStorage.removeItem('userCart');
            onClose(); // Close the cart popup on successful checkout
        } catch (error) {
            console.error('Checkout Failed:', error);
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#FFF2F7] p-8 rounded-lg w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        {newCart.length === 0 ? (
          <p className="text-center py-4">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {newCart.map((item) => (
                <div key={item.id} className="flex items-center text-sm">
                  <div className="w-1/2">{item.name}</div>
                  <div className="w-1/6 text-center">Qty: {item.quantity}</div>
                  <div className="w-1/4 text-right">Rp{item.price.toLocaleString()}</div>
                  <button 
                    onClick={() => onRemove(item.id)} 
                    className="w-1/12 flex justify-end text-pink-500 hover:text-pink-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4 text-xl font-bold">
                <span>Total:</span>
                <span>Rp{totalPrice.toLocaleString()}</span>
              </div>
              <Button className="w-full bg-pink-500 text-white hover:bg-pink-600 py-3 text-lg" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
