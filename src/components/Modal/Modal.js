import React from "react";

function ModalWrongOTP({ id, title, content }) {
    return <div class="modal fade" id={id} tabindex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id={`${id}Label`}>{title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p className="mb-0">{content}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
}

export default ModalWrongOTP;