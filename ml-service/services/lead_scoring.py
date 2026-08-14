def score_lead(lead_data: dict):
    # Rule based / simple ML scoring for leads
    # 90-100 HOT, 70-89 WARM, 40-69 MEDIUM, 0-39 COLD
    
    score = 91 # Demo
    category = "HOT"
    reasons = [
        "High previous purchase value",
        "Recent quotation activity",
        "Recent customer interaction"
    ]
    
    # Calculate score based on lead_data if available...
    
    return {
        "score": score,
        "category": category,
        "reasons": reasons
    }
