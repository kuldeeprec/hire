//Initial Template for C++

// CPP code to find largest and 
// second largest element in the array

#include <bits/stdc++.h>
using namespace std;



 // } Driver Code Ends
     

class Solution{
  public:
    /* Function to find largest and second largest element
    *sizeOfArray : number of elements in the array
    * arr = input array
    */
    vector<int> largestAndSecondLargest(int n, int arr[]){
        int max = arr[0],max2=-1;
        
        /*********************************
         * Your code here
         * This function should return a
         * vector with first element as
         * max and second element as 
         * second max
         * *******************************/
         vector<int>ans;
         for(int i=0;i<n;i++){
             if(arr[i]>max){
                 max=arr[i];
                 
             }
             
         }
         
         for(int i=0;i<n;i++){
             if(arr[i]>max2&&max2<max&&arr[i]!=max){
                 max2=arr[i];
             }
         }
         if(n<2){
             ans.push_back(-1);
             ans.push_back(-1);
             return ans;
         }
         else if(max==max2){
             ans.push_back(max);
             ans.push_back(-1);
             return ans;
         }
         else{
             ans.push_back(max);
             ans.push_back(max2);
             return ans;
         }
         
    }
};

// { Driver Code Starts.

// Driver Code
int main() {
	
	// Testcase input
	int testcases;
	cin >> testcases;
    
    // Looping through all testcases
	while(testcases--){
	    int sizeOfArray;
	    cin >> sizeOfArray;
	    
	    int arr[sizeOfArray];
	    
	    // Array input
	    for(int index = 0; index < sizeOfArray; index++){
	        cin >> arr[index];
	    }
	    Solution obj;
	    vector<int> ans = obj.largestAndSecondLargest(sizeOfArray, arr);
	    cout<<ans[0]<<' '<<ans[1]<<endl;
	}
	
	return 0;
}  // } Driver Code Ends