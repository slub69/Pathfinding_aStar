open = []   #set to be checked
closed = [] #already checked
open.append(start_node)
neighbours = [] #set of surrounding nodes

def lowest_value(array):
    #code to find lowest value in the set
    pass
def astar(start_node):
    while current_node != target_node:
        current_node = lowest_value(open)
        open.remove(current_node)
        closed.append(current_node)
        if current_node == target_node:
            break
        for neighbour_node in neighbours:
            if neighbour_node.closed or neighbour_node.n_transverable == True:
                astar(neighbour_node) #here i will call the function again but now using the neighbour as the current
            if neighbour_node.path() < current_node.path() or neighbour_node in open:
                total_f_cost = neighbour_node.f_cost
                current_node = neighbour_node.parent_node
                if neighbour_node not in open:
                    open.append(neighbour_node)
    
