package com.winepredictive.winepredictive.entity;

import java.util.List;

public record ModelListResponse(String object, List<GeminiModel> data) {
}
