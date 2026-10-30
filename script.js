const products=[
 {name:"Legacy Oversized Tee",price:799,detail:"Jet Black · Signature silver mark"},
 {name:"Royal Eagle Tee",price:899,detail:"Black · Eagle back graphic"},
 {name:"Legacy Statement Tee",price:849,detail:"Black · Silver statement print"}
];
let cart=[],activeProduct=0,activeSize="";
const $=id=>document.getElementById(id);
$("year").textContent=new Date().getFullYear();
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
function showCart(){ $("cartDrawer").classList.add("show");$("cartOverlay").classList.add("show"); }
function hideCart(){ $("cartDrawer").classList.remove("show");$("cartOverlay").classList.remove("show"); }
$("openCart").onclick=showCart;$("closeCart").onclick=hideCart;$("cartOverlay").onclick=hideCart;
document.querySelectorAll(".quick-add").forEach(btn=>btn.addEventListener("click",()=>{activeProduct=Number(btn.dataset.product);activeSize="";$("modalProduct").textContent=products[activeProduct].name;$("sizeModal").classList.add("show");document.querySelectorAll(".sizes button").forEach(b=>b.classList.remove("selected"));}));
$("closeSize").onclick=()=>$("sizeModal").classList.remove("show");
$("sizeModal").addEventListener("click",e=>{if(e.target===$("sizeModal"))$("sizeModal").classList.remove("show")});
document.querySelectorAll(".sizes button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".sizes button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");activeSize=b.textContent;});
$("confirmAdd").onclick=()=>{if(!activeSize){alert("Please select a size.");return;}cart.push({...products[activeProduct],size:activeSize,id:Date.now()});$("sizeModal").classList.remove("show");renderCart();showCart();};
function renderCart(){
 $("cartCount").textContent=cart.length;
 $("cartItems").innerHTML=cart.length?cart.map(item=>`<div class="cart-row"><div><strong>${item.name}</strong><small>Size: ${item.size} · ₹${item.price}</small></div><button class="remove-item" data-id="${item.id}">REMOVE</button></div>`).join(""):'<p class="empty-cart">Your bag is waiting for something iconic.</p>';
 $("subtotal").textContent="₹"+cart.reduce((sum,item)=>sum+item.price,0);
 document.querySelectorAll(".remove-item").forEach(btn=>btn.onclick=()=>{cart=cart.filter(x=>String(x.id)!==btn.dataset.id);renderCart();});
}
$("checkoutBtn").onclick=()=>{
 if(!cart.length){alert("Your bag is empty.");return;}
 const lines=cart.map(x=>`${x.name} | Size ${x.size} | ₹${x.price}`).join("\\n");
 const total=cart.reduce((s,x)=>s+x.price,0);
 const message=`Hello JAYVOR, I want to enquire about this order:\\n${lines}\\nTotal: ₹${total}\\nPlease share availability and payment/delivery details.`;
 // Add the official JAYVOR WhatsApp number below (country code + number, digits only).
 const WHATSAPP_NUMBER="91XXXXXXXXXX";
 if(WHATSAPP_NUMBER.includes("X")){alert("The store preview is ready. Before taking live orders, add your official WhatsApp number in script.js (search for WHATSAPP_NUMBER).");return;}
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
};
renderCart();
