package firstgame;

import com.almasb.fxgl.entity.component.Component;

public class DoorComponent extends Component {

	private boolean hasKey = false;
	
	@Override
	public void onAdded() {
		
	}

	public boolean isHasKey() {
		return hasKey;
	}

	public void setHasKey(boolean hasKey) {
		this.hasKey = hasKey;
	}

}
