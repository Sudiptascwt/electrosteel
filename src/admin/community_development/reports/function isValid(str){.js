function isValid(str){
    const stack =[];
    const pairs={
        ")":'(',
        '}':'{',
        ']':'['
    };
    for(let char of str){
        if(char==='(' || char=='{' || char==='['){
            stack.push(char);
        }
        else if(pairs[char]){
            if(stack.pop() !== pairs[char]){
                return false
            }
        }
    }
    return stack.length==0
}


async function getUser(id){
  const key = `user:${id}`;
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);

  const user = await db.query('SELECT * FROM users WHERE id=$1', [id]);
  await client.setEx(key, 60, JSON.stringify(user));
  return user;
}



function moveZeroes(nums){
    let j=0;
    for(let i=0;i<nums.length;i++){
        if (nums[i] !==0){
            [nums[i], nums[j]]== []
        }
    }
}

class MinStack{
     constructor(){
        this.stack = [];
        this.emns=[];
     }
     push(x){
        this.stack.push(x);
        if(this.mins.length===0 || x<=this.mins[this.mins.length -1]) this.mins.push(x)  
     }
    pop(){
        const x= this.stack.pop();
        if(x===this.mins[this.mins.length-1]) this.mins.pop();
        return x;
    }
    top() { return this.stack[this.stack.length-1] }
    getMin() { return this.mins[this.mins.length-1]}
    }


    function binarySearch(nums, target){
        let l=0,r=nums.length-1;
        while(l<=r){
            const mid=Math.floor((1+r)/2);
            if (nums[mid]== target) return mid;
            if(nums[mid] < target) l = mid+1;
            else r=mid-1
        }
        return -1;
    }

    function mergetwoLists(l1,l2){
        const dummy={ val:0, next: null };
        let tail = dummy;
        while(l1 && l2){
            if(l1.val<l2.val) {
                tail.next=l1; l1=l1.next;
            }
            else{
                tail.next =l2, l2=l2.next;
            }
            tail.next = l1 || l2;
            return dummy.next;
        }
    }






    