import React from "react";

function MenuUpdateModal({ menu, setMenu, socket}) {
    let newMenu = [...menu];

    function handleUpdateMenu() {
        for(let i = 0; i < newMenu.length; i++) {
            if(document.getElementById(`update-qnty-${i}`).value !== "") {
                newMenu[i].available = document.getElementById(`update-qnty-${i}`).value;
            }
        }
        setMenu(newMenu);
        socket.emit("restaurantmenuupdate", menu);
        window.$("#menuUpdateModal").modal("toggle");
    }
    return <div>
        <div class="modal fade" id="menuUpdateModal" tabindex="-1" aria-labelledby="menuUpdateModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="menuUpdateModalLabel">Menu Update</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Update Quantity</th>
                    <th scope="col">Available</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map((item, i) =>   <tr>
                        <th scope="row">{i+1}</th>
                        <td>{item.name}</td>
                        <td><input id={`update-qnty-${i}`} className="form-control" /></td>
                        <td>{item.available}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onClick={handleUpdateMenu}>Update</button>
        </div>
      </div>
    </div>
  </div>
    </div>
}

export default MenuUpdateModal;