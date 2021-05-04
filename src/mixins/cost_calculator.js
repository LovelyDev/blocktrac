import ziti from "../config/ziti"

export default {
  computed: {
    total_cost : function(){
      return ziti.membership_levels.reduce(function(cost, level){
        console.log(level)
        if(level == this.membership_level)
          cost[level] = 0;
        else
          cost[level] = ziti.membership_features[level].cost;

        if(this.plan && level == this.plan){
          if(this.enable_additional && this.selected_additional_filters)
            cost[level] += this.selected_additional_filters * ziti.additions_cost.filters
          if(this.enable_additional && this.selected_additional_sinks)
            cost[level] += this.selected_additional_sinks * ziti.additions_cost.sinks
        }

        else {
          if(this.enable_additional[level] && this.selected_additional_filters[level])
            cost[level] += this.selected_additional_filters[level] * ziti.additions_cost.filters;

          if(this.enable_additional[level] && this.selected_additional_sinks[level])
            cost[level] += this.selected_additional_sinks[level] * ziti.additions_cost.sinks;
        }

        cost[level] = parseFloat(cost[level].toFixed(2))

        return cost;
      }.bind(this), {});
    }
  }
}